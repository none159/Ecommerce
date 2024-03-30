import React, { useEffect, useRef, useState } from "react";
import img1 from "/images/CK_shirts_logo.jpeg"
import img2 from "/images/Tshirt/kemal-alkan-_BDBEP0ePQc-unsplash.jpg"
import soldimg from "/images/Icon-tag-percent.png"
import "../../assets/home.css"
import axios from "axios";
import { Link } from "react-router-dom";

import Singleitem from "../shopping/singleitem";
const Hero = ()=>{
      const images = [img1,img2]
      const[sale,setsale] =useState()
      const[trending,settrending]=useState()
      const [arrival,setarrival]=useState()
      const [res,setres]=useState()
      const[slider,setslider]=useState([])    
      const [image,setimage]= useState()
      const i = useRef(0)
      const addtocart=async()=>{

        sale.map(async(p)=>{
        await axios.post("https://ecommerce-pi-self.vercel.app/api/users/cart/save",{
         "productid":p.id,
         "email":JSON.parse(sessionStorage.getItem("email"))
        }).then((response)=>{
         if(response){
             console.log(response)
         }
        }).catch((err)=>{
         console.log(err)
        })
    })
     }
     const reloadSliderright =()=>{
        if(i.current>=images.length-1){
            i.current=0
            setimage(slider[0].img)
        }
        else if(i.current<images.length-1){
        
            i.current = i.current+1
            setimage(slider[i.current].img)
            
            
        }
     }
      const fetchtrending=async()=>{
        try{
        await axios.get("https://ecommerce-pi-self.vercel.app/api/trending").then((response)=>{
            settrending(response.data)

        })
    }catch(error){
        console.log(error)
    }
      }
      const fetchonsale=async()=>{
        try{
        await axios.get("https://ecommerce-pi-self.vercel.app/api/onsale").then((response)=>{
            setsale(response.data)

        })
    }catch(error){
        console.log(error)
    }
      }
      const fetchonslider=async()=>{
        try{
       await axios.get("https://ecommerce-pi-self.vercel.app/api/onslider").then((response)=>{
       
                
    if(image ==undefined && response.data!= undefined){
                    setslider(response.data)
                    setimage(slider[0].img)
    }
                
    

        })
    }catch(error){
 
    }
      }
      const fetcharrival=async()=>{
        try{
       await axios.get("https://ecommerce-pi-self.vercel.app/api/arrival").then((response)=>{
            setarrival(response.data)

        })
    }catch(error){
      console.log(error)
    }
      }
     const reloadSliderleft =()=>{

        if(i.current<=0){
            i.current=0
            setimage(slider[0].img)
        }
        else if(i.current>=0){
            i.current = i.current-1
            setimage(slider[i.current].img)
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
    useEffect(() => {fetchonslider()}, [slider]);
useEffect(()=>{
    fetchtrending()
    fetcharrival()
    fetchonsale()
    Tokencheck()

},[])
    return(
       <section>
          <div className="hero-container">
             {slider!=undefined && image!=undefined?<div className="slider">
                <div className="list">
                    <div className="items">
                 
                        <img  src={image} loading="lazy"/>
                 
                    </div>
                </div>
                <div className="buttons">
                       <button id="prev" onClick={reloadSliderleft}>&lt;</button>
                       <button id="next" onClick={reloadSliderright}>&gt;</button>
                </div>
                <ul className="dots">
                    <li className={i.current.toString() == "0" ? "active" :""}></li>
                    <li className={i.current.toString() == "1" ? "active" :""}></li>
                </ul>
            </div>
:'Ò'}
            <div className="trending-container">
                <h2>Top Trending</h2>
                <div className="trending">
                {trending != undefined ?trending.map((p,index)=>{
            if(index<=2){
                return(
                   
                  <Singleitem key={p.id} item={p}/>
            
                )}}):""}
                </div>
                <div className="arrow-container">
                   <Link to='/trending' state={{ from: trending }} ><a data-scroll>
                        <div className="arrow"></div>
                    </a>
                    </Link>
              </div>
            </div>
            <div className="newarrival-container">
                <h2><span style={{color:"rgb(189, 183, 183)"}}>New</span> Arrivals</h2>
                <div className="newarrival-cards">
                {arrival != undefined ?arrival.map((p)=>{
    
                    return(
                        <div className="newarrival-card" key={p.id}>
                                <img src={p.img} alt={p.img} loading="lazy"/>
                                <h2>{p.name}</h2>
                                <h3>Arrives In : {p.datearrival}</h3>

                </div>
                    )}):""}
                 </div>
            </div>
            <div className="sold-section">
               {sale!=undefined?sale.map((p)=>{
                return( <div className="sold-container" key={p.id}>
                    <div className="soldimg-container">
                        <img src={soldimg}/>
                    </div>
                    <div className="soldproduct">
                        <img src={p.img}/>
                         <h2>Sold {p.percentage} End in 5 days</h2>
                         <a onClick={res?addtocart:()=>{}}>Add To Cart</a>
                    </div>
                     </div>
                    )
               }):""}
               
            </div>
            <div className="subscription-container">
                <h2>Get More News From Us</h2>
                <div className="subscription-form">
                    <input placeholder="You're Email..."/>
                    <button>Subscribe</button>
                </div>
            </div>
          </div>
       </section>
    );
    }
export default Hero;