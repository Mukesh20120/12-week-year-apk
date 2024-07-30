const UserModel = require('../model/user');
const {asyncWrapper} = require('../middleware');
const { generateToken } = require('../utils/jwtGenerate&Validate');

const createAccount = asyncWrapper(async(req,res,next)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new Error('Please enter require field');
    }
    const find = await UserModel.find({email});
    if(find && find.length>0){
        throw new Error('Email already registered');
    }
    const newUser = await UserModel.create({email,password});
    res.json({success: true,message: 'user created successfully',User: newUser});
})

const logInAccount = asyncWrapper(async(req,res)=>{
    const {email,password} = req.body;
    if(!email || !password){
        throw new Error('Please enter require field');
    }
    const fetchUser = await UserModel.findOne({email});
    if(!fetchUser){
        throw new Error('Email not registered');
    }
    const isValidPassword = await fetchUser.matchPassword(password);
    console.log(isValidPassword)
    if(!isValidPassword){
     throw new Error('Invalid password')
    }
    let payload = {id: fetchUser?._id};
   
    const token = generateToken({payload});
    res.json({success: true,message: 'user login successfully',User: fetchUser,token});
})

module.exports = {createAccount,logInAccount};