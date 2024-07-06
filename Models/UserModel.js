const {Schema, model,Types:{Decimal128}} = require('mongoose');
const { errorCreater } = require('../utils/responseHandler');
// const {nanoid}=require("nanoid")

const userSchema=new Schema({
    username:{
        type:String,
        unique:true,
        required:[true, 'username is mandatory.']
    },
    name:{
        type:String,
        required:[true, 'name is mandatory.']
    },
    password:{
        type:String,
        required:[true, 'Password is mandatory.']
    
    },
    secret:{
        type:String,
    },
    cart:{
        type:[Object],
        default:[]
    },
    orders:{
        type:[Object],
        default:[]
    },
    totalValue:{
        type:Decimal128,
        set:(value)=>new Decimal128(value.toFixed(2)),
        get:(value)=>parseFloat(value),
        default:0
    },
    
    totalCount:{
        type:Number,
        default:0
    },
    
},{
    toObject:{
        getters:true,
    }
});

const formattedUserData=(userdata)=>{
    // const {_id,__v,password,...data}=userdata?.toObject();
    const {__v,password,...data}=userdata?.toObject();
    return data
}

userSchema.statics.createUser= async(userdata)=>{
    const data=await UserModel.create(userdata);
    console.log(data)
    return data;
}

userSchema.statics.findUser=async(username)=>{
    const user= (await UserModel.findOne({username},{_id:0,__v:0}))?.toObject();
    if(user)
    {
        return user;
    }
    errorCreater("user doesn't exists.",404)
    
}

userSchema.statics.getCart= async(username)=>{
    const {cart,totalValue,totalCount}=await UserModel.findUser(username)
    console.log(`${cart}   ${totalValue} ${totalCount}`)
    
    return {cart,totalValue,totalCount}
}

userSchema.statics.addToCart= async(username,product)=>{
    console.log("product.price========",product.price)
    const {_id,__v,password,...data}=(await UserModel.findOneAndUpdate({username},{
        // $addToSet:{cart:{...product,quantity:1}},
        $push:{cart:{...product,quantity:1}},
        
        $inc:{totalCount:1,totalValue:product.price}

    },{new:true}))?.toObject()
    return data
}


userSchema.statics.removeFromCart= async(username,product)=>{
    const data=await UserModel.findOneAndUpdate({username},{
        $pull:{cart:{...product,quantity:1}},
        $inc:{totalCount:-product.quantity,totalValue:-parseFloat(product.price)*parseInt(product.quantity)}

    },{new:true})
    return formattedUserData(data)
}

userSchema.statics.increment= async(username,product, increment=true)=>{
    const factor=increment?1:-1
    const data=await UserModel.findOneAndUpdate({username, "cart.id":product.id},{
        
        $inc:{totalCount:factor,
            totalValue:product.price * factor,
            "cart.$.quantity":factor
        }

    },{new:true})
    const userData=formattedUserData(data)
    if (!increment && userData.cart.some(({quantity})=>quantity===0)) {
        const removeZerzQty= await UserModel.findOneAndUpdate({username},{
            $pull:{cart:{quantity:0}}
        },{new:true})
        return formattedUserData(removeZerzQty)
    }
    return userData
}

userSchema.statics.clearCart=async(username)=>{
    const data=(await UserModel.findOneAndUpdate({username},{
        $set:{
            cart:[],
            totalCount:0,
            totalValue:0,
        }
    },{new:true}))
    return formattedUserData(data)
}

userSchema.statics.checkout=async(username)=>{
    
}

userSchema.statics.updatePassword=async(username,password)=>{
    const updatedData= await UserModel.updateOne({username},{
        $set:{password}
    })
    if(updatedData.modifiedCount)
        {
            return "Password reset successfully."
        }
    if(updatedData.matchedCount)
        {
            errorCreater("new password can not be same as old password")
        }
}

const UserModel=model("users",userSchema)
module.exports=UserModel;

// console.log("nano ----",nanoid(5))