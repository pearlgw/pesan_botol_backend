const express = require("express");
const router = express.Router();
const ReplyMessageController = require("../controller/ReplyMessageController")
const ValidationReplyMessage = require("../validation/ReplyMessageValidation")

router.get("/", ReplyMessageController.GetAllReplyMessages);
router.post("/", ValidationReplyMessage.createReplyMessageValidation, ReplyMessageController.CreateReplyMessages);
router.delete("/:reply_id", ReplyMessageController.DeleteReplyMessage);

module.exports = router;
