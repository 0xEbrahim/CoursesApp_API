
const { ERROR } = require('../utils/httpStatusText');
const notFound = (req, res , next) => {
    res.status(404).json({status : ERROR, message : "this resource is not available."})
}
const globalErrorHandler = (error, req, res, next) => {
    res.status(error.statusCode || 500).json({status : error.statusText || ERROR , message : error.message, code :error.statusCode || 500 , data : null});
}
module.exports = {
    notFound,
    globalErrorHandler
}