const express = require("express");
const router = express.Router();
const MessageController = require("../controller/MessageController")
const ValidationMessage = require("../validation/MessageValidation")

router.get("/", MessageController.GetAllMessages);
router.post("/", ValidationMessage.createMessageValidation, MessageController.CreateMessages);
router.delete("/:id", MessageController.DeleteMessages);

module.exports = router;