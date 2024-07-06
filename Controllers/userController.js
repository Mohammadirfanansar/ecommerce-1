const UserModel=require('../Models/UserModel');
const { generateToken } = require('../utils/jwtUtil');
const { generatePasswordHash, verifyPassword } = require('../utils/passwordUtil');
const { errorCreater,responseCreator } = require('../utils/responseHandler');
const { generateQRcode, verifyOTP } = require('../utils/totpUtil');

const login=async (req,res,next)=>{

    try{
        const {username,password}=req.body;
        const {secret,password:pwdHash,...userData}=await UserModel.findUser(username);
        
        const isValid=await verifyPassword(password,pwdHash)
        if(isValid)
        {
            const token=generateToken(userData,'3600s')
            res.cookie("token",token,{maxAge:3600_000, httpOnly:true})
            res.send(responseCreator("User logged in successfully",{...userData}))
        }
        else
        {
            errorCreater("Incorrect password",401)
        }

    }catch(error){
        next(error)
    }
}
const signup=async (req,res,next)=>{
    try {
        const {password,...userdata}=req.body
        const pwdHash=await generatePasswordHash(password)
        userdata.password=pwdHash;
        const {qrcode,secret}=await generateQRcode(userdata.username)
        // console.log("qrcode====",qrcode)
        // console.log("secret====",secret)
        const data=await UserModel.createUser({...userdata,secret})
        if(data)
        {
            res.status(201)
            res.send(responseCreator("user account created successfully!!!",qrcode))
            // res.send(`<img src=${qrcode}/>`)
        }
        
    } catch (error) {
        next(error)
    }
}

const loginWithCookie=async (req,res,next)=>{
    try {
        const userData= res.locals.user;
        // console.log("jjjjjjjjjjjj")
        // console.log(userData)
        res.send(responseCreator("Logged in via cookie",userData))
    } catch (error) {
        next(error)
    }
}

const resetPassword=async (req,res,next)=>{
    try {
        const {username,otp,password}=req.body
        if(!otp){
            errorCreater("enter otp",401)
        }
        const {secret}=await UserModel.findUser(username)
        const isOTPVerified=verifyOTP(secret,otp);
        if(isOTPVerified)
        {   const pwdHash=await generatePasswordHash(password)
            const message=await UserModel.updatePassword(username,pwdHash)
            res.send(responseCreator(message))
        }else{
            errorCreater("invalid otp",401)
        }
    } catch (error) {
        next(error)
    }
}

const logout=async(req,res,next)=>{
    res.clearCookie("token")
    res.send(responseCreator("Logged out!!!",null))
}

module.exports={login,signup,loginWithCookie,resetPassword,logout}