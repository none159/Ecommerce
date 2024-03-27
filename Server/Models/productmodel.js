const mongoose = require("mongoose")
const productSchema = mongoose.Schema({
    productid:{
        type:Number,
        required:true,
        unique:true
    },
    productname: {
        type:String,
        required:true,

    },
    productdescription: {
        type:String,
        required:true,

    },
    productcost: {
        type:String,
        required:true,

    },
    productcategory: {
        type:String,
        required:true,

    },
    productimg: {
        type:String,
        required:true,

    },
    productonsale: {
        type:Boolean,
        

    },
    productontrending: {
        type:Boolean,


    },
    productonarrival: {
        type:String,
   

    },
    productdatearrival: {
        type:String,
       

    },
    productonslider:{
        type:Boolean
    }
})

const Product = mongoose.model("Product",productSchema)

export default Product;