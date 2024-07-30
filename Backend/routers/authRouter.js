const authRouter = require('express').Router();
const {createAccount,logInAccount} = require('../controller/authentication');

authRouter.post('/signup',createAccount);
authRouter.post('/login',logInAccount);

module.exports = authRouter;