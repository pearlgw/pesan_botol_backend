const { body } = require("express-validator");

exports.createReplyMessageValidation = [
  body("message").notEmpty().withMessage("message wajib diisi"),
];