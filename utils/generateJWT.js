const jwt = require('jsonwebtoken');

const generateToken = async (data) => {
    return await jwt.sign(data,process.env.JWT_SECRET_KEY,{expiresIn:'1m'})
}

module.exports = {generateToken}