const { body } = require("express-validator");

exports.createMessageValidation = [
  body("message").notEmpty().withMessage("message wajib diisi"),
];