const User = require('../model/userModel');
const asyncWrapper = require('../middlewares/asyncWrapper')
const {validationResult } = require('express-validator')
const appError = require('../utils/error');
const { FAIL, SUCCESS } = require('../utils/httpStatusText');
const {hashingPassword, matchedPassword} = require('../utils/passwordHashing');


const register = asyncWrapper( async (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        const error = appError.create(result.array(), 400, FAIL)
        return next(error);
    }
    const {firstName, lastName, email, password} = req.body;
    const user = await User.findOne({email});
    if(user){
        const error = appError.create("This email address is being used by another user.",400, FAIL);
        return next(error)
    }
    // password hashing 
    const hashedPassword = await hashingPassword(password);

    const newUser = new User({
    firstName,
    lastName,
    email,
    password: hashedPassword
    });
   await newUser.save()
   res.status(201).json({status: SUCCESS, data: {user : newUser}})
})

const logIn = asyncWrapper( async (req, res, next) => {
    const result = validationResult(req);
    if(!result.isEmpty()){
        const error = appError.create(result.array(), 400 , FAIL);
        return next(error);
    }
    const {email, password} = req.body;
    const user = await User.findOne({email : email});
    if(!user){
        const error = appError.create("Email or Password is wrong.", 404 , FAIL);
        return next(error);
    }
    //console.log(user)
    const match = await matchedPassword(password, user.password);
    if(match){
       return res.status(200).json({status:SUCCESS, data:{user:"logged-In successfully"}})
    }else{
        const error = appError.create("Email or Password is wrong.", 500 , FAIL);
        return next(error);
    }
   
})
module.exports = {
    register,
    logIn
}

