const bcrypt = require('bcrypt');

const hashingPassword = async (password) => {
    const salt =  await bcrypt.genSalt(10);
    return await bcrypt.hash(password,salt)
}

const matchedPassword = async (password, hashedPassword)=>{
    return await bcrypt.compare(password, hashedPassword)
}

module.exports = {
    hashingPassword,
    matchedPassword
}