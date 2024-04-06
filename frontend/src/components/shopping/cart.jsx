import React, { useEffect, useState } from "react";
import Navbar from "../home/navbar";
import Footer from "../home/footer";
import Singleitem from "./singleitem";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Cartpage = ()=>{
    const [data,setdata]=useState([])
    const [useddata,setuseddata]=useState()
    const fetchcart = async()=>{
        if(localStorage.getItem("cart")){
            const cartlocal = JSON.parse(localStorage.getItem("cart"))
            cartlocal.map(async(p)=>{
             await axios.get(`https://ecommerce-pi-self.vercel.app/api/product/${p.id}`).then((response)=>{
                if(response.data!=undefined){
                    setdata(data.push({...response.data,size:cartlocal.size,quantity : cartlocal.quantity}))
                    setuseddata(data.flat())
                    
                 }
            })
        })
        
        }
        const email = JSON.parse(sessionStorage.getItem("email"))
        if(email) {
        const usercart = await axios.post("https://ecommerce-pi-self.vercel.app/api/users/cart",{"email":email}).then((response)=>{return response.data})
        usercart.map(async(cart)=>{
         await axios.get(`https://ecommerce-pi-self.vercel.app/api/product/${cart.productid}`).then((response)=>{
            if(response.data!=undefined){
                setdata(data.push(response.data))
                setuseddata(data.flat())
             }
        })
    })
}
    }
    useEffect(()=>{
        fetchcart()
   
    },[])
    return(
        <>
        <Navbar/>
        <h2 className="item-category">Cart :</h2>
        <section className="items-section">
        {useddata!=undefined?useddata.map((item)=>{
            return(
        <Singleitem item={item}/>
            )
        }):""}
        </section>
        <Link to="/"><button className="back">Back</button></Link>
        <Footer/>
       </>
    )
}
export default Cartpage;