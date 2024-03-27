const mongoose = require("mongoose")
const connectDatabase = async()=>{
    try{
      const connection = await mongoose.connect(process.env.MONGO_URL,{
        useUnifiedTopology:true,
        useNewUrlParser:true,
      })
    }catch(error){
        console.log(error)
    }
}
module.exports=connectDatabase