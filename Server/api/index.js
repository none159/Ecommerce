
import express from "express";
import items from "./data/products.json" with {type:"json"};
import fs from "fs"
import mongoose from "mongoose";
import dotenv from "dotenv"
import cors from 'cors'
import bodyParser from "body-parser";
import connectDatabase from "../config/mongodb.js";
import ImportData from "../data/dataimport.js";
import Product from "../Models/productmodel.js";
const products = items
dotenv.config({path:"../.env"});
connectDatabase()
const app = express();
app.use(cors())
app.use(express.json())
app.use("/api/users",ImportData);
app.delete("/api/products/remove/:id",(req,res)=>{
    const id = req.params.id * 1;
    const objtodelete= items.find((p)=>p.id===id)
    const index = items.indexOf(objtodelete)   
    items.splice(index,1) 
    if(req.params.id !=""&&objtodelete!=undefined){
    fs.writeFile('./data/products.json',JSON.stringify(items),(err)=>{
        if(err){
            res.send("something wrong!!!")
        }
        else{
        res.status(204).json({
            status:"success",
            data:{
                items:null
            }
        })
    }
    })
    }else{
        res.send("Invalid Id Or Already Deleted Item")
    }

})
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
         res.json(productarray)
        }
    else{
        res.send("product not found.")
    }
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.post("/api/products/add",(req,res)=>{
    if(JSON.stringify(req.body) != "{}" && req.body.name!="" && req.body.name !=null&&req.body.description!="" && req.body.description !=null&&req.body.categorie!="" && req.body.categorie !=null){
        const name = req.body.name.replace(/[^a-zA-Z ]/g, '')
        const description= req.body.description.replace(/[^a-zA-Z ]/g, '')
        const categorie = req.body.categorie.replace(/[^a-zA-Z ]/g, '')
    if(name!=""&&description!=""&&categorie!=""){

    items.push(
        {
            "id":products[products.length-1].id+1,
            "name":name,
            "description":description,
            "categorie":categorie,
            "img":req.body.image             

        }
    )
    fs.writeFile('./data/products.json',JSON.stringify(items),(err)=>{
        if(err){
            res.send("something wrong!!!")
        }
        else{
        res.status(204).json({
            status:"success",
            data:{
                items:null
            }
        })
    }
    })
}
else{
    res.send("provide valid data")
}
    }
 
   res.send("Invalid JSON Object")
    
})
app.post("/api/product/add",(req,res)=>{})
app.get("/",(req,res)=>{
    res.send("API Is Running....");
})
app.listen(5000,console.log("Server running"));

