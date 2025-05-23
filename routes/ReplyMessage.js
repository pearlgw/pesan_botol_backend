const express = require("express");
const router = express.Router();
const ReplyMessageController = require("../controller/ReplyMessageController")
const ValidationReplyMessage = require("../validation/ReplyMessageValidation")

router.get("/:message_id/reply", ReplyMessageController.GetAllReplyMessages);
router.post("/:message_id/reply", ValidationReplyMessage.createReplyMessageValidation, ReplyMessageController.CreateReplyMessages);
router.delete("/:message_id/reply/:reply_id", ReplyMessageController.DeleteReplyMessage);

module.exports = router;