import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom';
import Singleitem from "./singleitem";
import "../../assets/items.css"
import axios from "axios";
import Navbar from "../template/navbar";
import Footer from "../template/footer";

const Itemslist = ()=>{
    const [searchParams] = useSearchParams();
    const categorie=searchParams.get("categorie");
    const [data,setdata]=useState()
    const fetchcategorie = async()=>{
        try{
    await axios.get(`https://ecommerce-server-3gc3d7lb9-yassines-projects-51a48afb.vercel.app/api/products/category?categorie=${categorie}`).then((response)=>{
        if(!response.data.includes("Error")){
    setdata(response.data)
        }
        else{
         console.log("something wrong")
        }
    
})
        }catch(error){
            console.log("error")
        }
    }
    useEffect(()=>{
        fetchcategorie()
    },[categorie])
    return(
      <>
      <Navbar/>
      <h2 className="item-category">{categorie}</h2>
        <section className="items-section">
            {data != undefined?data.map((item)=>{
                return(
            <Singleitem item={item}/>
                )
            })
            :""
}
        </section>
        <span className="underitems"></span>
        <Footer/>
    </>
    )
}

export default Itemslist;