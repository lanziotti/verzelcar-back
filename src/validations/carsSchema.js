const joi = require('joi');

const userSchema = joi.object({
    nome: joi.string().required().messages({
        'any.required': 'Por favor, preencha todos os campos.',
        'string.empty': 'Por favor, preencha todos os campos.'
    }),
    marca: joi.string().required().messages({
        'any.required': 'Por favor, preencha todos os campos.',
        'string.empty': 'Por favor, preencha todos os campos.',
    }),
    modelo: joi.string().required().messages({
        'any.required': 'Por favor, preencha todos os campos.',
        'string.empty': 'Por favor, preencha todos os campos.'
    }),
    preco: joi.number().required().messages({
        'any.required': 'Por favor, preencha todos os campos.',
    })
});

module.exports = userSchema;