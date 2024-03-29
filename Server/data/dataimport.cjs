const express = require("express")
const User = require("../Models/usermodel.cjs");
const bcrypt = require("bcryptjs");
const items = require("./products.json");
const generatetoken = require("../utils/generatetoken.cjs");
const protect = require("../middleware/authmiddleware.cjs");
const asyncHandler = require("express-async-handler");
const Cart = require("../Models/cartmodel.cjs");
const Favorite = require("../Models/favoritemodel.cjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const Payement = require("../Models/cardmodel.cjs");
const Product = require("../Models/productmodel.cjs")

const ImportData=express.Router().use(cors());
ImportData.use(cors({origin:"https://ecommerce-frontend-theta-plum.vercel.app/login"}))
ImportData.use(express.json())
ImportData.post("/",async(req,res)=>{
    const {email}=req.body
     const users =await User.find({})
     res.send(users)
   

})
ImportData.post("/tokencheck",async(req,res)=>{
    const {email,token} = req.body
    if(email && token ){
    const user = await User.findOne({email})
    if(!user){
        res.send(false)  
     
    }
    else if(email!= undefined && user && token!=undefined){
        const decoded = jwt.verify(token,process.env.JWT_SECRET)
        if(decoded){
            res.send(true)
        }
        else{
            
            res.send(false)
        
        }
    }
}
})
ImportData.post("/cart/save",async(req,res)=>{
    const {productid,email,quantity,size}=req.body
    if(Product.find({productid})){
    const quantite= Number(quantity)
      await Cart.create({productid,email,quantity:quantite,size})
       res.send("Saved")
    }
    else{
        res.status(401)
        throw new Error("no product found with this id")
    }

})
ImportData.post("/favorite/save",async(req,res)=>{
    const {productid,email}=req.body
    if(await Favorite.findOne({productid})){
        res.status(401)
          throw new Error("no product available for rating")
    }
    else if(items.map((p)=>p).filter((p)=>p.id==productid)  ){
        await Favorite.create({productid,email})
         res.send("Saved")
      }
      else{
          res.status(401)
          throw new Error("no product found with this id")
      }


})
ImportData.post("/cart",async(req,res)=>{
    const {email}=req.body
    const cart =await Cart.find({email})
    res.send(cart)
  

})
ImportData.post("/favorite",async(req,res)=>{
    const {email} = req.body
    const favorite =await Favorite.find({email})
    res.send(favorite)
  

})
ImportData.post("/login",async(req,res)=>{
    
    const {email,password}=req.body
    if(email && password){
    const importuser = await User.findOne({email});
    if(importuser && (await importuser.matchPassword(password))){
        res.send({
            _id:importuser._id,
            fullname:importuser.fullname,
            email:importuser.email,
            token:generatetoken(importuser._id),
            createdAt:importuser.createdAt
        })

    }   
    else{
         res.status(401);
         throw new Error("Invalid Email or Password");
     
    }
    }
})
ImportData.post("/register",async(req,res)=>{
    const {email,password,fullname,username,adresse,zip}=req.body
    const importuser = await User.findOne({email});
    if(importuser){
        res.status(400)
        throw new Error("user already exist")

    }   
    const user = await User.create({
        fullname,email,password,adresse,zip,username
    })
    if(user){
        res.status(201).json({
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            adresse:user.adresse,
            username:user.username,
            zip:user.zip,
            token:generatetoken(user._id)
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid User Data")
    }

})
ImportData.post("/payement",async(req,res)=>{
    const {cardnumber,cardname,expiringdate,email,paypalemail}=req.body
    let user;
    const importuser = await Payement.findOne({email});
    if(importuser){
        res.status(400)
        throw new Error("Payement info already exist")

    }   
    if(cardname!=undefined && cardnumber!=undefined && expiringdate !=undefined){
      user = await Payement.create({
        cardnumber,cardname,expiringdate,email
    })
}
   if(paypalemail!=undefined){
    user = await Payement.create({
        email,paypalemail
    })
   }
    if(user){
        res.status(201).json({
            _id:user._id,
            cardnumber:user.cardnumber,
            cardname:user.cardname,
            expiringdate:user.expiringdate,
            email:user.email,
            paypalemail:user.paypalemail
        })
    }
    else{
        res.status(400)
        throw new Error("Invalid Payement Data")
    }

})
ImportData.post("/profile",async(req,res)=>{
    const { email } = req.body
    if(email){
     const user = await User.findOne({email});
if(user){
    res.json({
        _id:user._id,
        fullname:user.fullname,
        email:user.email,
        adresse:user.adresse,
        username:user.username,
        createdAt:user.createdAt
    })
}
else{
    res.status(404);
    throw new Error ("User not found")
}
    }
})
module.exports=ImportData;