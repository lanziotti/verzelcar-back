require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
        host: process.env.KNEX_HOST,
        port: process.env.KNEX_PORT,
        user: process.env.KNEX_USER,
        password: process.env.KNEX_PASS,
        database: process.env.KNEX_NAME,
        ssl: { rejectUnauthorized: false }
    }
});

module.exports = knex;