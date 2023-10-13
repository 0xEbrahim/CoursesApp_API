let User = require('../model/userModel');
const asyncWrapper = require('../middlewares/asyncWrapper')
const appError = require('../utils/error');
const {validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const {
    SUCCESS,
    FAIL,
    ERROR
} = require('../utils/httpStatusText');

const getAllUsers = asyncWrapper(
    async (req, res) => {
       // console.log(req.headers)
        const query = req.query;
        const limit = query.limit || 10;
        const page = query.page || 1;
        const users = await User.find({} ,{"__v" : false, "password":false}).limit(limit).skip((page - 1) * limit);
        res.json({status : SUCCESS, data : {users}});
    }
)

const getUser = asyncWrapper( async (req, res, next) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if(!user){
        const error = appError.create("User not found", 404 , FAIL);
        return next(error);
    }
    return res.json({status: SUCCESS , data : {user}});
})

const deleteUser = asyncWrapper( async (req, res) => {
    const id = req.params.id;
    await User.deleteOne({_id : id});
    res.status(200).json({status: SUCCESS, data :null});
    }
)

const updateUser = asyncWrapper ( async (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        const error = appError.create(result.array(),400,FAIL)
        return next(error)
    }
    const id = req.params.id;
    const updatedUser = User.updateOne({_id : id}, {$set : {...req.body}});
    res.status(200).json({status: SUCCESS, data: {updatedUser}})
    }
)

module.exports = {
    getAllUsers,
    getUser,
    deleteUser,
    updateUser
} 