const mongoose = require("mongoose")
  
const favoriteSchema = mongoose.Schema({
    productid:{
        type:Number,
        required:true,
        unique:true
    },
    email: {
        type:String,
        required:true,

    }
})

const Favorite = mongoose.model("Favorite",favoriteSchema)

module.exports= Favorite;