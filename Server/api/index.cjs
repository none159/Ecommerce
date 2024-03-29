
const express=require("express")
const items = require("../data/products.json");
const dotenv = require("dotenv")
const cors = require("cors");
const connectDatabase = require("../config/mongodb.cjs");
const ImportData = require("../data/dataimport.cjs");
const Product = require("../Models/productmodel.cjs");

const products = items
dotenv.config({path:"../.env"});
connectDatabase()
const app = express();
const options = [
  cors({
    origin: '*',
    methods: '*',
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
];

app.use(options);


app.use(express.json())
app.use("/api/users",ImportData);

app.get("/api/products",async(req,res)=>{
   const product =await  Product.find({})
        let productarray =[];
    
        product.map((p)=> {
           productarray.push({
            id:p.productid,
            name:p.productname,
            description:p.productdescription,
            categorie:p.productcategory,
            img:p.productimg,
            sale:p.productonsale,
            trending:p.productontrending,
            onarrival:p.productonarrival,
            datearrival:p.productdatearrival,
            slider:p.productonslider,
            price:p.productcost

           })
        });
    
        res.json(productarray);  
      
    
})
app.get("/api/products/search",async(req,res)=>{
    try{
    if( req.query.search != ""&&req.query.search!=null){
    const searchterm = req.query.search.replace(/[^a-zA-Z ]/g, '')
    //Products.find({productname;{ $regex: '.*' + searchterm + '.*' },productdescription:{ $regex: '.*' + searchterm + '.*' }})
    const product = await Product.find({productname:{ $regex: '.*' + searchterm + '.*' },productdescription:{ $regex: '.*' + searchterm + '.*' }})
    let productarray=[];
    if(product){
        await product.map((p)=>{productarray.push({  

            id:p.productid,
            name:p.productname,
            description:p.productdescription,
            categorie:p.productcategory,
            img:p.productimg,
            price:p.productcost

         })})
        await res.json(productarray)
        }
    else{
        res.send("product not found.")
    }
}
    }
catch(error){
    res.send(error)
}

res.send("provide valid search term")
})
app.get("/api/allproducts/add",async(req,res)=>{
    let product;
    products.map(async(p)=>{
     const {id,name,description,price,categorie,img,onarrival,sale,trending,datearrival,slider}=p
    product = await Product.create(
        {productid:id,productname:name,productdescription:description,productcost:price,productcategory:categorie,productimg:img,productonarrival:onarrival,productonsale:sale,productontrending:trending,productdatearrival:datearrival,productonslider:slider})
    })
    if(product){
        res.send("addition successed")
    }
    
})
app.get("/api/trending",async(req,res)=>{
    // Product.find({productontrending:true})
    const product = await Product.find({productontrending:true})
    let productarray=[];
    if(product){
        await product.map((p)=>{productarray.push({  

        
            id:p.productid,
            name:p.productname,
            description:p.productdescription,
            categorie:p.productcategory,
            img:p.productimg,
            trending:p.productontrending,
            price:p.productcost

         })})
        res.json(
         productarray
        )
        }
    else{
        res.send("no Trending product available")
    }
})
app.get("/api/onsale",async (req,res)=>{
    // Product.find({productonsale:true})
    const product = await Product.find({productonsale:true})
    let productarray=[];
    if(product){
        await product.map((p)=>{productarray.push({  

            id:p.productid,
            name:p.productname,
            description:p.productdescription,
            categorie:p.productcategory,
            img:p.productimg,
            sale:p.productonsale,
            price:p.productcost

         })
         
    })
    res.json(productarray)
    }
    else{
        res.send("no product at sale at the moment , please check later.")
    }
})
app.get("/api/onslider",async(req,res)=>{
    const product = await Product.find({productonslider:true})
    let productarray=[];
    if(product){
        await product.map((p)=>{productarray.push({   id:p.productid,
            name:p.productname,
            description:p.productdescription,
            categorie:p.productcategory,
            img:p.productimg,
            slider:p.productonslider,
            price:p.productcost
        })
         
    })
        res.json(productarray)
    }
    else{
        res.send("no product at slider at the moment , please check later.")
    }
})
app.get("/api/arrival",async(req,res)=>{
    // Product.find({productonarrival:true})
    const product = await Product.find({productonarrival:true})
     let productarray=[];
    if(product){
        await product.map((p)=>{productarray.push({ id:p.productid,
            name:p.productname,
            description:p.productdescription,
            categorie:p.productcategory,
            img:p.productimg,
            onarrival:p.productonarrival,
            datearrival:p.productdatearrival,
            price:p.productcost
        })
         
    })
    res.json(productarray)
}
    else{
        res.send("Error : no product at arrival at the moment , please check later.")
    }
})
app.get("/api/products/category",async(req,res)=>{
        // Product.find({productcategory:category})
    if(req.query.categorie != "" && req.query.categorie !=null ){
        const categorie = req.query.categorie.replace(/[^a-zA-Z ]/g, '')
        const product = await Product.find({productcategory:categorie})
        let productarray=[];
        if(product && categorie!=""){
            await product.map((p)=>{productarray.push({  
    
    
                id:p.productid,
                name:p.productname,
                description:p.productdescription,
                categorie:p.productcategory,
                img:p.productimg,
                price:p.productcost
    
             })})
        res.json(
          productarray
        )
        }
        else{
            res.send("Error : no product found with this id")
        }
}
else{
    res.send("Error : Enter required parameters")
}
})

app.get("/api/products/:id",async(req,res)=>{
        // Product.find({productid:req.pararms.id*1,productcategory;categorie})
    if(req.query.categorie != "" && req.query.categorie !=null && req.params.id != null){
        const categorie = req.query.categorie.replace(/[^a-zA-Z ]/g, '')
        const product = await Product.find({productid:req.params.id*1,productcategory:categorie})
        let productarray=[];
    if(product && categorie!=""){
        await product.map((p)=>{productarray.push({  

           

            id:p.productid,
            name:p.productname,
            description:p.productdescription,
            categorie:p.productcategory,
            img:p.productimg,
            price:p.productcost
     
    
         })})
        res.json(productarray)
        }
        else{
            res.send("no product found with this id")
        }
}
else{
    res.send("Error : Enter required parameters")
}
})
app.get("/api/product/:id",async(req,res)=>{
    // Product.find({productid:req.pararms.id*1})
    if(req.params.id != null){
        const product = await Product.find({productid:req.params.id})
        let productarray=[];
        if(product){
            await product.map((p)=>{productarray.push({  
  
                id:p.productid,
                name:p.productname,
                description:p.productdescription,
                categorie:p.productcategory,
                img:p.productimg,
                price:p.productcost
    
             })})
        res.json(
         productarray)
        }
        else{
            res.send("no product found with this id")
        }
}
else{
    res.send("Error : Enter required parameters")
}
})
app.get("/",(req,res)=>{
    res.send("API Is Running....");
})
app.listen(5000,console.log("Server running"));

module.exports = app;
