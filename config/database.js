require("dotenv").config();

let mysql = require("mysql2")

let connnection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

connnection.connect(function (error) {
    if (!!error) {
        console.log(error);
    } else {
        console.log('Connection Successfully!');
    }
})

module.exports = connnection;