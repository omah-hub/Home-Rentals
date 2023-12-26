require('dotenv').config();

const mysql = require('mysql2');

const pool = mysql.createPool({
    port: process.env.DB_PORT,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
}).promise(); // This makes the pool support promises

// Attempt to connect to MySQL
pool.getConnection()
    .then((connection) => {
        console.log('Connected to MySQL');
        connection.release(); // Release the connection immediately after checking
    })
    .catch((err) => {
        console.error('Error connecting to MySQL:', err);
    });

module.exports = pool;
