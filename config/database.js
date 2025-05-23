const mysql = require("mysql2");

function connectWithRetry() {
    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });

    connection.connect(function (error) {
        if (error) {
            console.log("MySQL Connection Error:", error);
            console.log("Retrying in 5 seconds...");
            setTimeout(connectWithRetry, 5000);  // coba ulang setelah 5 detik
        } else {
            console.log("MySQL Connection Successfully!");
        }
    });

    return connection;
}

const connection = connectWithRetry();

module.exports = connection;