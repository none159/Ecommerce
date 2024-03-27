const mongoose = require("mongoose")
  
const payementSchema = mongoose.Schema({
    cardnumber:{
        type:Number
    },
    cardname:{
        type:String
    },
    expiringdate:{
        type:String
    },
    email: {
        type:String,
        required:true
        
    },
    paypalemail: {
        type:String
        
    }
},
)

const Payement = mongoose.model("payement",payementSchema)

module.exports=Payement;