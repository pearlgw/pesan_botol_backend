const messageService = require('../service/MessagesService');
const formatDate = require('../utils/FormatedDate');

const { validationResult } = require("express-validator")

exports.GetAllMessages = async (req, res, next) => {
    try {
        const messages = await messageService.getAllMessagesService();
        const formattedRows = messages.map(row => ({
            ...row,
            created_at: formatDate(row.created_at),
        }));
        return res.status(200).json({
            status: true,
            message: "List data messages",
            data: formattedRows
        });
    } catch (err) {
        next(err);
    }
}

exports.CreateMessages = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map(err => err.msg);
        return res.status(422).json({
            status: false,
            message: "Validasi gagal",
            errors: messages,
        });
    }

    try {
        await messageService.createMessageService(req.body);
        res.status(201).json({
            status: true,
            message: "Berhasil menyimpan pesan",
        });
    } catch (err) {
        next(err);
    }
};

exports.DeleteMessages = async (req, res, next) => {
    const id = req.params.id;

    try {
        await messageService.deleteMessageService(id);
        res.status(200).json({
            status: true,
            message: "Delete data successfully",
        });
    } catch (err) {
        next(err);
    }
}