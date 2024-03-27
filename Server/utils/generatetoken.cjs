
const jwt= require("jwt")
const generatetoken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET,{
       expiresIn:"30d",
    })
}
module.exports= generatetoken;