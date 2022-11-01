const knex = require('../database/connection');
const bcrypt = require('bcrypt');

const registerUser = async (req, res) => {
    const { nome, email, nome_loja, senha } = req.body;

    try {
        const user = await knex('usuarios').where({ email }).first();

        if (user) {
            return res.status(400).json({ mensagem: "Esse e-mail já existe cadastrado." })
        }

        const encryptedPassword = await bcrypt.hash(senha, 10);

        const registeredUser = await knex('usuarios')
            .insert({
                nome,
                email,
                nome_loja,
                senha: encryptedPassword
            })
            .returning(['id', 'nome', 'email', 'nome_loja']);

        if (!registeredUser[0]) {
            return res.status(500).json({ mensagem: "Erro interno do servidor." });
        }

        return res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });

    } catch (error) {
        return res.status(500).json({ mensagem: "Erro interno do servidor." });
    }
}

module.exports = {
    registerUser
}