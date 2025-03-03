const { body } = require("express-validator");

exports.contactValidators = [
  body("name")
    .isLength({ min: 3, max: 24 })
    .withMessage("Nimi peab olema vähemalt 3 ja maksimaalselt 24 sümboli pikk")
    .trim(),
  body("suggestion")
    .isLength({ min: 8, max: 244 })
    .withMessage("Ette panek peab olema vähemalt 8 ja maksimaalselt 244 sümboli pikk")
    .trim(),
];

exports.imageValidators = [
  body("author")
    .isLength({ min: 3, max: 24 })
    .trim()
    .withMessage("Autor peab olema vähemalt 3 ja maksimaalselt 24 sümboli pikk"),
  body("file").isEmpty().withMessage("Загрузите файл"),
];
