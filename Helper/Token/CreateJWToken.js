const jwt = require('jsonwebtoken')

const createToken = async(username,email,role) => {

    const {JWT_SECRET_KEY,JWT_EXPIRE_TIME} = process.env

    const payload = {
        username,
        email,
        role
    }

    const token = await jwt.sign(payload,JWT_SECRET_KEY,{
        expiresIn:JWT_EXPIRE_TIME
    });
    return token

}

module.exports = {createToken}