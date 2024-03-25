import mongoose from "mongoose";
  
const cartSchema = mongoose.Schema({
    productid:{
        type:Number,
        required:true
    },
    email: {
        type:String,
        required:true,
        
    },
    quantity:{
        type:Number,
        required:true,
    },
    size : {
        type:String,
        required:true
    }
},
)

const Cart = mongoose.model("cart",cartSchema)

export default Cart;