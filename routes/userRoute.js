const express = require('express');
const router = express.Router();
const {userValidationSchema,loginSchema} = require('../middlewares/validationSchema')
const {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser
} = require('../controllers/userController')
const {
    logIn,
    register
} = require('../controllers/auth')
const {verifyToken }= require('../middlewares/verifyToken')
router.route('/register').post(userValidationSchema(),register);
router.route('/login').post(loginSchema(),logIn)
router.route('/').get(verifyToken,getAllUsers);
router.route('/id')
.get(getUser)
.patch(userValidationSchema(),updateUser)
.delete(deleteUser)
module.exports = router;