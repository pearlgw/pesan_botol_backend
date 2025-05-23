const connection = require('../config/database');

exports.getAllMessagesService = () => {
    return new Promise((resolve, reject) => {
        const query = "SELECT * FROM messages ORDER BY id desc";
        connection.query(query, (err, rows) => {
            if (err) {
                return reject(new AppError("Gagal ambil message dari database", 500));
            }
            return resolve(rows);
        });
    });
};

exports.createMessageService = (data) => {
    return new Promise((resolve, reject) => {
        const formData = {
            message: data.message,
            created_at: new Date(),
        };

        const query = "INSERT INTO messages SET ?";
        connection.query(query, formData, (err, result) => {
            if (err) {
                return reject(new AppError("Gagal menyimpan message", 500));
            }

            resolve(result);
        });
    });
};

exports.deleteMessageService = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`SELECT * FROM messages WHERE id = ?`, [id], (err, results) => {
            if (err) {
                return reject({ statusCode: 500, message: "Database error" });
            }

            if (results.length === 0) {
                return reject({ statusCode: 404, message: "Message not found" });
            }

            connection.query(`DELETE FROM messages WHERE id = ${id}`, (err2, results2) => {
                if (err2) {
                    return reject({ statusCode: 500, message: "Failed to delete data" });
                }

                resolve(results2);
            });
        });
    });
}