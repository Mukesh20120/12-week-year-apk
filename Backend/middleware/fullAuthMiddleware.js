const { isTokenValid } = require('../utils/jwtGenerate&Validate');
const {asyncWrapper} = require('./asyncWrapper')

const authentication = asyncWrapper(async(req,res,next)=>{
  const authHeader = req.headers.authorization;
  if(!authHeader){
    throw new Error('unauthorized user');
  }
  let token;
  if(authHeader && authHeader.startsWith('Bearer')){
     token = authHeader.split(' ')[1];
  }
  if(!token){
    throw new Error('Token not provided');
  }
  const payload = await isTokenValid({token});
  if(!payload){
    throw new Error('Invalid token Please provide valid token');
  }

  req.decode = {};
  req.decode['id']=payload.id;
  next();
})

module.exports = authentication;