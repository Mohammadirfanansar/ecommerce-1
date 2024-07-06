const express=require('express')
const app=express()
const cookieParser=require("cookie-parser")
const PORT=4003
const path=require('path')
app.use(express.json())
app.use(cookieParser())
const cors=require("cors")
// router middleware
const router=require("./routes/router")
const errorHandler = require('./utils/errorHandler')
const userRouter=require('./routes/userRouter')
const cartRouter=require('./routes/cartRouter')
const { authController } = require('./Controllers/authController')


app.use(cors({
    origin:'http://localhost:3000',
    credentials:true
}))

//http://localhost:4003/checkServer
app.get('/checkServer',(req,res)=>{
    console.log(req.path)
    console.log(req.params)
    console.log(req.query)

    res.send({success:true, message:'Successful response from server.'})
})

http://localhost:4003/router
app.use('/router',router)

http://localhost:4003/userRouter
app.use('/user',userRouter)
app.use('/cart',cartRouter)
app.use('',express.static(path.join(__dirname,'build')))
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'./build/index.html'))
})
// app.use('*',(req,res)=>{
//     res.sendFile(path.join(__dirname,"./build"))
// })
app.use(errorHandler)

//app.get('/')

app.listen(PORT,()=>{
    console.log(`Server started at port no ${PORT}`)
})