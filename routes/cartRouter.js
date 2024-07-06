const express=require("express");
const { getCartItems, addToCart, removeFromCart,decrement,increment, clearCart } = require("../Controllers/cartController");
const { authController } = require("../Controllers/authController");
const cartRouter=express.Router()

cartRouter.get('/getCart',authController,getCartItems);
cartRouter.post('/addToCart',authController,addToCart);
cartRouter.post('/removeFromCart',authController,removeFromCart);
cartRouter.patch('/increment',authController,increment);
cartRouter.patch('/decrement',authController,decrement);
cartRouter.put('/clearCart',authController,clearCart);

module.exports=cartRouter; 