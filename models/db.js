const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root', 
    password: 'root', 
    database: 'supermarket_db' 
});

module.exports = pool.promise();