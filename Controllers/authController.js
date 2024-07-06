const UserModal = require("../Models/UserModel")
const { verifyToken } = require("../utils/jwtUtil")


const authController= async (req,res,next)=>{
    try {
        const {token=null}=req.cookies;
        const {username}=verifyToken(token);
        
        const {password,secret, ...userData}=await UserModal.findUser(username);
        // const userData=await UserModal.findUser(username);
        
        res.locals.user=userData;
        const {username1}=res.locals.user
        console.log(username1)
        next();
    } catch (error) {
        next(error);
    }
}

module.exports={authController}