const express=require('express')

const router=express.Router();

require("../dbConnection")
// '/' --> http://localhost:4003/router/
router.get('/',(req,res)=>{
    console.log(req.path)
    console.log(req.params)
    console.log(req.query)

    res.send({success:true, message:'Successful response from router.'})
})

router.get('/totp',(req,res)=>{
  
    res.send(`<img src="" />`)
})


// http://localhost:4003/router/user/123?search=abc&country=IN&currency=INR
router.get('/user/:id',(req,res)=>{
    console.log("user ",req.path)
    console.log(req.params)
    console.log(req.query)

    res.send({success:true, message:'Successful response from user route handler.'})
})

// http://localhost:4003/router/signup
router.post('/signup',(req,res)=>{
    console.log('router-post')
    console.log('req.path',req.path)
    console.log('req.body',req.body)

    const {id=null}=req.body

    res.send({success:true, message:`Successful response from signup route handler. User id - ${id}`})
})

router.all('*',(req,res)=>{
    console.log("wildcard route")
    res.status(404)
    res.send({success:false,message:"Invalid route"})
})

module.exports = router