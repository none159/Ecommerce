import React, { useEffect, useState } from "react";
import Navbar from "../home/navbar";
import Footer from "../home/footer";
import Singleitem from "./singleitem";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Favoritepage = ()=>{
    const [data,setdata]=useState([])
    const [useddata,setuseddata]=useState()
   const [res,setres]=useState()
   const navigate = useNavigate()
    const fetchfavorite = async()=>{
        const email = JSON.parse(sessionStorage.getItem("email"))
        if(email) {
        const userfavorite = await axios.post("https://ecommerce-pi-self.vercel.app/api/users/favorite",{"email":email}).then((response)=>{return response.data})
        userfavorite.map(async(favorite)=>{
         await axios.get(`https://ecommerce-pi-self.vercel.app/api/product/${favorite.productid}`).then((response)=>{
             if(response.data!=undefined){
                setdata(data.push(response.data))
                setuseddata(data.flat())
             }
              
               
           
        })
    })
}
    }
    const Tokencheck=async()=>{

        const email = JSON.parse(sessionStorage.getItem("email"))
        const token = JSON.parse(sessionStorage.getItem("token"))
        if(email && token){
        await axios.post("https://ecommerce-pi-self.vercel.app/api/users/tokencheck",{
            email:email,
            token:token
        }).then((response)=>{   
          if(response.data!=undefined)
              setres(response.data)
    
    }).catch((err)=>{
        console.log(err)
    })
}
    }
    useEffect(()=>{
        fetchfavorite()
        Tokencheck()
        if(!res){
            navigate("/login")
        }
    },[])
    return(
        <>
        <Navbar/>
        <h2 className="item-category">Favorite :</h2>
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
export default Favoritepage;