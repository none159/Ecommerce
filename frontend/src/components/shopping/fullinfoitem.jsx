import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../home/navbar";
import Footer from "../home/footer";
import { Link } from "react-router-dom";

const Fullinfoitem =()=>{
    const [searchParams] = useSearchParams();
    const categorie = searchParams.get("categorie");
    const id = searchParams.get("id");
    const navigate = useNavigate()
    const [size,setsize]=useState("")
    const [quantity,setquantity]=useState(0)
    const [data,setdata]=useState()
    const [res,setres]=useState()
    const [user,setuser]=useState()
    const fetchitem = async()=>{
        try{
     await axios.get(`https://ecommerce-pi-self.vercel.app/api/products/${id}?categorie=${categorie}`).then((response)=>{
        if(!response.data.includes("Error")){
        setdata(...response.data)
        }
        else{
            console.log("something wrong")
        }
      })
    }catch(error){
        console.log("error")
    }
    }
    const addtocart=async()=>{
 
        if(size != "" && quantity!=0 && !res){
            if (JSON.parse(localStorage.getItem("cart")!=undefined)){
                const cartitems = JSON.parse(localStorage.getItem("cart"))
                cartitems.push({
                    id: id,
                    quantity: quantity,
                    size: size,
                  })

                localStorage.setItem(
                  "cart",
                  JSON.stringify(cartitems))
                ;
                  }
                  else{
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([
                          {
                            id: id,
                            quantity: quantity,
                            size: size,
                          },
                        ])
                      );
                    }
                }
                    else if(res){
                        if(JSON.parse(localStorage.getItem("cart"))){
                            await axios.post("https://ecommerce-pi-self.vercel.app/api/users/cart/save",{
                                "productid":JSON.parse(localStorage.getItem("cart")).id,
                                "email":JSON.parse(sessionStorage.getItem("email")),
                                "quantity":JSON.parse(localStorage.getItem("cart")).quantity,
                                "size":JSON.parse(localStorage.getItem("cart")).size
                            }).then((response)=>{
                                if(response){
                                    setquantity(0)
                                    setsize("")
                                }
                            }).catch((err)=>{
                                console.log(err)
                            })
                        }
                    await axios.post("https://ecommerce-pi-self.vercel.app/api/users/cart/save",{
                        "productid":id,
                        "email":JSON.parse(sessionStorage.getItem("email")),
                        "quantity":quantity,
                        "size":size
                    }).then((response)=>{
                        if(response){
                            setquantity(0)
                            setsize("")
                        }
                    }).catch((err)=>{
                        console.log(err)
                    })
                }
    
}
    const addtofavorites = async()=>{
        await axios.post("https://ecommerce-pi-self.vercel.app/api/users/favorite/save",{
            "productid":id,
            "email":JSON.parse(sessionStorage.getItem("email"))

        }).then((response)=>{
            if(response){
                console.log(response)
            }
           }).catch((err)=>{
            console.log(err)
           })
           
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
        fetchitem()
    },[id,categorie])
    return(
    <>
      <Navbar/>
       <section className="fullinfo-section">
         {data!=undefined?
         <div className="fullinfo-container">
            <div className="fullinfo-img">
                <img src={data.img}/>
            </div>
            <div className="fullinfo">
                <h2>{data.name}</h2>
                <h3><span>Description : </span> {data.description}</h3>
                <h4><span>Categorie : </span> {data.categorie}</h4>
                <select onChange={(e)=>setsize(e.target.value)} >
                    <option disabled selected>Choose Size</option>
                    <option>S</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>XXL</option>
                </select>
                <h2>Quantity :</h2>
                <input type="number" onChange={(e)=>setquantity(e.target.value)} defaultValue={quantity} min={1} max={20}></input>
                <div className="fullinfobtns">
                <button onClick={res != false?addtocart:""}>Add to Cart</button>
                <button onClick={res !=false?addtofavorites:Tokencheck?navigate("/login"):""}>Add to Favorites</button>
                <Link to="/payement" style={{textDecoration:"inherit",color:"inherit"}}><button>Buy</button></Link>
                </div>
            </div>
         </div>
         :""}
           <Link to={`/products?categorie=${categorie}`}><button className="back">Back</button></Link>
       </section>
     <Footer/>
    </>
    )
}
export default Fullinfoitem;