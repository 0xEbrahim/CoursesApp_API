const jwt = require('jsonwebtoken')
const appError = require('../utils/error');
const {  ERROR } = require('../utils/httpStatusText');
const verifyToken = (req, res, next)=>{
    const authHeader = req.headers['Authorization'] || req.headers['authorization'];
    if(!authHeader){
        const error = appError.create("Token is required.", 401, ERROR)
        return next(error);

    }
    const token = authHeader.split(' ')[1];
    try{
        jwt.verify(token, process.env.JWT_SECRET_KEY)
        next();
    }catch(err){
        const error = appError.create("Invalid Token.", 401, ERROR)
        return next(error);
    }
}

module.exports = {verifyToken}
