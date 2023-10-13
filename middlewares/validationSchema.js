const { body } = require("express-validator");

const coursesValidationSchema = () => [
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

const userValidationSchema = () => [
    body('firstName')
    .notEmpty()
    .withMessage("Your first name can't be empty.")
    .isLength({min: 4})
    .withMessage('Your first name should be at least 4 characters.')
    ,body('lastName')
    .notEmpty()
    .withMessage("Your last name can't be empty.")
    .isLength({min: 4})
    .withMessage('Your last name should be at least 4 characters.')
    ,body('email')
    .notEmpty()
    .withMessage("Your E-mail can't be empty.")
    .trim()
    .isEmail()
    ,body('password')
    .notEmpty()
    .withMessage("Password cannot be empty.")
    .isLength({ min: 6 })
]

const loginSchema = () => [
    body('email')
    .notEmpty()
    .withMessage("Your E-mail can't be empty.")
    .trim()
    .isEmail()
    ,body('password')
    .notEmpty()
    .withMessage("Password cannot be empty.")
]

module.exports = {
    coursesValidationSchema,
    userValidationSchema,
    loginSchema
}