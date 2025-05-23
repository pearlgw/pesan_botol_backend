const replyMessageService = require('../service/ReplyMessagesService');
const formatDate = require('../utils/FormatedDate');

const { validationResult } = require("express-validator")

exports.GetAllReplyMessages = async (req, res, next) => {
    const { message_id } = req.params;
    try {
        const replyMessages = await replyMessageService.getAllReplyMessagesService(message_id);
        const formattedRows = replyMessages.map(row => ({
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

exports.CreateReplyMessages = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const messages = errors.array().map(err => err.msg);
        return res.status(422).json({
            status: false,
            message: "Validasi gagal",
            errors: messages,
        });
    }

    const messageId = req.params.message_id;
    const replyMessage = req.body.message;

    try {
        const isMessageExist = await replyMessageService.checkMessageExists(messageId);
        if (!isMessageExist) {
            return res.status(404).json({
                status: false,
                message: "Message tidak ditemukan"
            });
        }

        await replyMessageService.createReplyMessageService({
            message_id: messageId,
            message: replyMessage,
        });

        return res.status(201).json({
            status: true,
            message: "Berhasil menyimpan reply",
        });

    } catch (err) {
        next(err);
    }
};

exports.DeleteReplyMessage = async (req, res, next) => {
    const { message_id, reply_id } = req.params;

    try {
        const isMessageExist = await replyMessageService.checkMessageExists(message_id);
        if (!isMessageExist) {
            return res.status(404).json({
                status: false,
                message: "Message tidak ditemukan"
            });
        }

        const result = await replyMessageService.deleteReplyMessageService(message_id, reply_id);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                status: false,
                message: "Reply message tidak ditemukan",
            });
        }

        res.status(200).json({
            status: true,
            message: "Reply message berhasil dihapus",
        });
    } catch (err) {
        next(err);
    }
};