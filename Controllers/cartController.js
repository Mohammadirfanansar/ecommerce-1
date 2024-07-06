const UserModel=require('../Models/UserModel');
const { errorCreater,responseCreator } = require('../utils/responseHandler');



const getCartItems=async (req,res,next)=>{
    try {
        const {username}=res.locals.user;
        console.log(req.body)
        console.log(username)
        const data=await UserModel.getCart(username)
        console.log(data)
        res.send(responseCreator("fetched cart items",data))
    } catch (error) {
        next(error)
    }
}

const addToCart=async (req,res,next)=>{
    try {
        const {username}=res.locals.user
        const product=req.body;
        const data=await UserModel.addToCart(username,product)
        res.send(responseCreator(`${product.title} added to cart.`,data))
    } catch (error) {
        next(error)
    }
}
const removeFromCart=async (req,res,next)=>{
    try {
        const {username}=res.locals.user
        const product=req.body
        const data=await UserModel.removeFromCart(username,product)
        res.send(responseCreator(`${product.title} removed from cart`,data))
    } catch (error) {
        next(error)
    }
}

const increment=async (req,res,next)=>{
    try {
        const {username}=res.locals.user
        const product=req.body
        const data=await UserModel.increment(username,product)
        res.send(responseCreator(`${product.title} added to cart`,data))
    } catch (error) {
        next(error)
    }
}
const decrement=async (req,res,next)=>{
    try {
        const {username}=res.locals.user
        const product=req.body
        const data=await UserModel.increment(username,product,false)
        res.send(responseCreator(`${product.title} removed to cart`,data))
    } catch (error) {
        next(error)
    }
}
const checkout=async (req,res,next)=>{
    const orderId=Math.random()*100000;
    const {cart, totalCount, totalValue}=await UserModel.getCart(username)
    const order={
        orderId,
        items:cart,
        totalCount,
        totalValue
    }

    const data=await UserModel.updateOne({username},{
        $push:{orders:order}
    })
    if(data.modifiedCount){
        return {orderId,totalCount}

    }
}
const clearCart=async (req,res,next)=>{
    try {
        const {username}=res.locals.user
        const data=await UserModel.clearCart(username)
        res.send(responseCreator( `removed from cart`,data))
    } catch (error) {
        next(error)
    }
}


module.exports={getCartItems,addToCart,removeFromCart,increment,decrement,checkout,clearCart}
