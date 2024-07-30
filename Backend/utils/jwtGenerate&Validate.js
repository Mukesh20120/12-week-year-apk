const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = ({payload})=>{
return jwt.sign(payload,process.env.JWT_SECRET);
}

const isTokenValid = async({token})=>{
    return await jwt.verify(token,process.env.JWT_SECRET);
}

module.exports = {generateToken,isTokenValid}