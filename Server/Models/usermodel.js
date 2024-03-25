import mongoose from "mongoose";
import bcrypt from "bcryptjs"  
const userSchema = mongoose.Schema({
   fullname:{
        type:String,
        required:true
    },
    email: {
        type:String,  
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    adresse:{
        type:String,
        required:true
    },
    zip:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    }
},
{
    timestamps:true
})
userSchema.methods.matchPassword = async function(enterpassword){
    return await  bcrypt.compare(enterpassword,this.password);
}
userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        next();
    }else{
        const salt = await bcrypt.genSalt(10)
        this.password =  await bcrypt.hash(this.password,salt)
    }
})
const User = mongoose.model("User",userSchema)

export default User;