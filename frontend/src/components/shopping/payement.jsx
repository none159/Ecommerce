import React, { useEffect, useState } from "react";
import Navbar from "../template/navbar";
import Footer from "../template/footer";
import "../../assets/payement.css"
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Payement = ()=>{
    const [paypalchecked,setpaypalcheck]= useState(false)
    const navigate = useNavigate()
    const [res,setres]=useState()
    const payement = async(e)=>{
        e.preventDefault();
        const formData= new FormData(e.target)
        const cardnumber = formData.get("cardnumber");
        const cardname = formData.get("cardname");
        const expiringdate = formData.get("expiringdate");
        const paypalemail = formData.get("paypalemail");
        const email = JSON.parse(sessionStorage.getItem("email"))
        console.log(cardnumber)
        if(cardnumber!=undefined){
        await axios.post("https://ecommerce-server-3gc3d7lb9-yassines-projects-51a48afb.vercel.app/api/users/payement",{
             "cardnumber" : cardnumber,
             "cardname":cardname,
             "expiringdate":expiringdate,
             "email":email
        })
    }
    else if(paypalemail!=undefined){
        await axios.post("https://ecommerce-server-3gc3d7lb9-yassines-projects-51a48afb.vercel.app/api/users/payement",{
            "email":email,
            "paypalemail":paypalemail
       })
   }
    }
    const Tokencheck=async()=>{

        const email = JSON.parse(sessionStorage.getItem("email"))
        const token = JSON.parse(sessionStorage.getItem("token"))
        await axios.post("https://ecommerce-server-3gc3d7lb9-yassines-projects-51a48afb.vercel.app/api/users/tokencheck",{
            email:email,
            token:token
        }).then((response)=>{   
          if(response.data!=undefined)
              setres(response.data)
    
    }).catch((err)=>{
        console.log(err)
    })
    
    }
    useEffect(()=>{
        Tokencheck()
     if(res==false){
        navigate("/login")
     }
    },[])
    return(
        <>
        <Navbar/>
        {!paypalchecked?<section className="payement-section">
            <form onSubmit={payement}>
                <div className="cardchoices-container">
                      <div>
                        <input type="radio" name="radio" onChange={()=>setpaypalcheck(!paypalchecked)}/>
                        <i class="fa fa-paypal" aria-hidden="true"></i>
                      </div>
                      <div>
                        <input type="radio" name="radio" checked={!paypalchecked?"true":"false"}/>
                          <i class="fa fa-cc-visa" aria-hidden="true"></i>
                          <i class="fa fa-cc-mastercard" aria-hidden="true"></i>
                      </div>
                </div>
                <div className="card-form-container">
                    <h2>Card Number :</h2>
                    <input placeholder="3702-9601-7503-0001" name="cardnumber" required/> 
                    <h2>Name on Card : </h2>
                    <input type="text" placeholder="john doe" name="cardname" required/>
                    <div className="card-small-input">
                    <h2>Expiring Date :</h2>
                    <input placeholder="04/28" name="expiringdate" required/>
                    <h2>Security Code :</h2>
                    <input type="password" placeholder="******" name="securitycode" required />
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </section>:""}
        {paypalchecked?
              <section className="payement-section">
                <form onSubmit={payement}>
                  <div className="cardchoices-container">
                        <div>
                          <input type="radio" name="radio" checked={paypalchecked?"true":"false"}/>
                          <i class="fa fa-paypal" aria-hidden="true"></i>
                        </div>
                        <div>
                          <input type="radio" name="radio" onChange={()=>setpaypalcheck(!paypalchecked)}/>
                            <i class="fa fa-cc-visa" aria-hidden="true"></i>
                            <i class="fa fa-cc-mastercard" aria-hidden="true"></i>
                        </div>
                  </div>
                  <div className="card-form-container">
                      <h2>Email :</h2>
                      <input placeholder="johndoe@gmail.com" name="paypalemail" required/>
                      <h2>Password :</h2>
                      <input type="password" placeholder="******" required/>
                  </div>
                  <button type="submit">Submit</button>
              </form>
          </section>
       :"" }
        <Footer/>
        </>
    )
}
export default Payement;