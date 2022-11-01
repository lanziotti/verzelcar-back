require('dotenv').config();
const knex = require('../database/connection');
const { uploadImage, deleteImage } = require('../services/uploads');

const listCars = async (req, res) => {
    const { user } = req;

    try {
        const cars = await knex('carros').where({ usuario_id: user.id });

        const formattedCars = cars.map((car) => {
            return {
                ...car,
                foto: `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_BACKBLAZE}/${car.foto}`
            }
        })

        return res.status(200).json(formattedCars);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

const getCar = async (req, res) => {
    const { user } = req;
    const { id } = req.params;

    try {
        const car = await knex('carros').where({
            id,
            usuario_id: user.id
        }).first();

        if (!car) {
            return res.status(404).json({mensagem: "Carro não encontrado."});
        }

        const formattedCar = {
            ...car,
            foto: `https://${process.env.BUCKET_NAME}.${process.env.ENDPOINT_BACKBLAZE}/${car.foto}`
        }

        return res.status(200).json(formattedCar);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

const registerCar = async (req, res) => {
    const { user } = req;
    const { nome, marca, modelo, preco } = req.body;
    const { originalname, mimetype, buffer } = req.file;

    try {
        let car = await knex('carros').insert({
            nome,
            marca,
            modelo,
            preco,
            usuario_id: user.id
        }).returning('*');

        if (!car) {
            return res.status(400).json({ mensagem: "O carro não foi cadastrado." });
        }

        const id = car[0].id;

        const image = await uploadImage(
            `carros/${id}/${originalname}`,
            buffer,
            mimetype
        )

        car = await knex('carros').update({
            foto: image.path
        }).where({ id }).returning('*');

        car[0].foto = image.url;

        return res.status(201).json(car[0]);

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

const updateCar = async (req, res) => {
    const { user } = req;
    const { id } = req.params;
    const { nome, marca, modelo, preco } = req.body;

    try {
        const foundCar = await knex('carros').where({
            id,
            usuario_id: user.id
        }).first();

        if (!foundCar) {
            return res.status(404).json({ mensagem: "Carro não encontrado." });
        }

        const car = await knex('carros')
            .where({ id })
            .update({
                nome,
                marca,
                modelo,
                preco
            });

        if (!car) {
            return res.status(400).json({ mensagem: "O carro não foi atualizado." });
        }

        return res.status(200).json({ mensagem: "Carro atualizado com sucesso." });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

const updateCarImage = async (req, res) => {
    const { originalname, mimetype, buffer } = req.file;
    const { id } = req.params;

    try {
        const foundCar = await knex('carros').where({
            id,
            usuario_id: req.user.id
        }).first();

        if (!foundCar) {
            return res.status(404).json({ mensagem: "Carro não encontrado." });
        }

        await deleteImage(foundCar.foto);

        const upload = await uploadImage(
            `carros/${foundCar.id}/${originalname}`,
            buffer,
            mimetype
        )

        const car = await knex('carros')
            .where({ id })
            .update({
                foto: upload.path
            });

        if (!car) {
            return res.status(400).json({ mensagem: "O carro não foi atualizado." });
        }

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

const deleteCar = async (req, res) => {
    const { user } = req;
    const { id } = req.params;

    try {
        const foundCar = await knex('carros').where({
            id,
            usuario_id: user.id
        }).first();

        if (!foundCar) {
            return res.status(400).json({ mensagem: "Carro não encontrado." });
        }

        const carExcluded = await knex('carros').where({
            id,
            usuario_id: user.id
        }).del();

        if (!carExcluded) {
            return res.status(400).json({ mensagem: "O carro não foi excluído." });
        }

        return res.status(200).json({ mensagem: "Carro excluído com sucesso." });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

const deleteCarImage = async (req, res) => {
    const { id } = req.params;

    try {
        const foundCar = await knex('carros').where({
            id,
            usuario_id: req.user.id
        }).first();

        if (!foundCar) {
            return res.status(404).json({ mensagem: "Carro não encontrado." });
        }

        await deleteImage(foundCar.foto);

        const car = await knex('carros')
            .where({ id })
            .update({
                foto: null
            });

        if (!car) {
            return res.status(400).json({ mensagem: "O carro não foi excluído." });
        }

        return res.status(204).send();

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    listCars,
    getCar,
    registerCar,
    updateCar,
    updateCarImage,
    deleteCar,
    deleteCarImage
}