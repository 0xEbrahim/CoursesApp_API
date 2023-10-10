const { body } = require("express-validator");

const validationSchema = () => [
    body('title')
    .notEmpty()
    .withMessage("title can't be empty.")
    .isLength({min : 2})
    .withMessage("Title should be at least 2 chars"),
     body('price')
    .notEmpty()
    .withMessage("Price is required")
    .isNumeric()
    .withMessage("price should be a number")
] 

module.exports = {
    validationSchema
}