const connection = require('../config/database');
const AppError = require('../utils/AppError');

exports.getAllReplyMessagesService = (message_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT id, message_id, message, created_at 
            FROM reply_messages 
            WHERE message_id = ? 
            ORDER BY id DESC
        `;
        connection.query(query, [message_id], (err, rows) => {
            if (err) {
                return reject(new AppError("Gagal ambil reply message dari database", 500));
            }
            return resolve(rows);
        });
    });
};

exports.checkMessageExists = (id) => {
    return new Promise((resolve, reject) => {
        const query = `SELECT id FROM messages WHERE id = ?`;
        connection.query(query, [id], (err, results) => {
            if (err) return reject(err);
            resolve(results.length > 0);
        });
    });
};

// Simpan reply message
exports.createReplyMessageService = (data) => {
    return new Promise((resolve, reject) => {
        const formData = {
            message_id: data.message_id,
            message: data.message,
            created_at: new Date(),
        };

        connection.query(`INSERT INTO reply_messages SET ?`, formData, (err, result) => {
            if (err) {
                return reject(new AppError("Gagal menyimpan reply message", 500));
            }

            resolve(result);
        });
    });
};

exports.deleteReplyMessageService = (message_id, reply_id) => {
    return new Promise((resolve, reject) => {
        const query = `
            DELETE FROM reply_messages 
            WHERE id = ${reply_id} AND message_id = ${message_id}
        `;
        connection.query(query, (err, result) => {
            if (err) {
                return reject(new AppError("Gagal menghapus reply message", 500));
            }

            resolve(result);
        });
    });
};
