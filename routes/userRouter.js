const express=require('express');
const { login, signup, loginWithCookie, resetPassword, logout } = require('../Controllers/userController');
const { authController } = require('../Controllers/authController');


const userRouter=express.Router();


userRouter.post('/login',login)
userRouter.post('/signup',signup)
userRouter.patch('/resetPassword',resetPassword)
userRouter.get('/login',authController,loginWithCookie)
userRouter.get('/logout',logout)


module.exports = userRouter