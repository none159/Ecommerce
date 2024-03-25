import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../template/navbar";
import Footer from "../template/footer";
import { Link } from "react-router-dom";
import Singleitem from "./singleitem";
const Searchitems =()=>{
    const [searchParams] = useSearchParams();
    const search = searchParams.get("search");
    const [data,setdata]=useState()
    const fetchitem = async()=>{
        try{
     await axios.get(`http://127.0.0.1:5000/api/products/search?search=${search}`).then((response)=>{
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
        fetchitem()
    },[])
    return(
    <>
      <Navbar/>
         <h2 className="item-category">{search}</h2>
       <section className="items-section">
            {data != undefined?data.map((item)=>{
                return(
            <Singleitem item={item}/>
                )
            })
            :""
}
       </section>
           <Link to={`/`}><button className="back">Back</button></Link>
     <Footer/>
    </>
    )
}
export default Searchitems;