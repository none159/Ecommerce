import React,{useEffect, useState} from "react";
import "../../assets/login.css"
import Navbar from "../template/navbar";
import Footer from "../template/footer";
import axios from "axios";
import Token from "./Token.jsx";
import { redirect, useNavigate } from "react-router-dom";

const Login =(props)=>{
  const [data,setdata] =useState()
  const navigate = useNavigate()
  const [email,setemail]=useState()
  const [res,setres]=useState()
  const [password,setpassword]= useState()
  const login = async(e)=>{
    e.preventDefault()
    if(email && password){
      await axios.post("https://ecommerce-pi-self.vercel.app/api/users",{
       email:email,
      }).then((response)=>{
               setdata(response.data)
               if(data!=undefined){
                navigate("/")
               }
      }).catch((err)=>{
        console.log(err)
      })
    }
  }
  const Tokencheck=async()=>{

    const email = JSON.parse(sessionStorage.getItem("email"))
    const token = JSON.parse(sessionStorage.getItem("token"))
    if(email && token) {
    await axios.post("https://ecommerce-pi-self.vercel.app/api/users/tokencheck",{
        email:email,
        token:token
    }).then((response)=>{   
      if(response.data!=undefined)
          setres(response.data)

}).catch((err)=>{
    console.log(err)
})}

}
  useEffect(()=>{
    Token(data?.token,data?.email)
    Tokencheck()
    if(res){
      navigate("/")
    };

  
  },[data,res])
    return(
      <>
        <Navbar/>
        <section className="login-section">
          <div className="login-container">
              <h2>Login</h2>
              <form className="login-form">
                <h3>Email</h3>
                <input type="email"  placeholder="Email..."  value={email} onChange={(e)=>setemail(e.target.value)}required/>
                <h3>Password</h3>
                <input type="password" placeholder="Password..." value={password} onChange={(e)=>setpassword(e.target.value)} required/>
                <button onClick={(e)=>login(e)}>Submit</button>
              </form>
          </div>
        </section>
        <Footer/>
      </>
    )
}
export default Login;