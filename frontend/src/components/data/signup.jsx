import React, {useState, useEffect } from 'react'
import "../../assets/signup.css"
import Navbar from '../template/navbar';
import Footer from '../template/footer';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
const Signup =()=>{
    const navigate = useNavigate()
    const [data,setdata] =useState()
    const [email,setemail]=useState()
    const [password,setpassword]= useState()
    const [confirmpassword,setconfirmpassword]= useState()
    const [firstname,setfirstname]= useState()
    const [lastname,setlastname]= useState()
    const [username,setusername]= useState()
    const [adresse,setadresse]= useState()
    const [zip,setzip]= useState()
    const signup = async(e)=>{
        e.preventDefault()
        const emailmatch = email.toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
        if(confirmpassword===password && emailmatch){
        await axios.post("https://ecommerce-pi-self.vercel.app/api/users/register",{
         "email":email,
         "password":password,
         "fullname":firstname+" "+lastname,
         "username":username,
         "adresse":adresse,
         "zip":zip
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
useEffect(()=>{
  if(data!="" && data != undefined )navigate("/")
},[data])
    return(
        <>
        <Navbar/>
       <section className='Signup-section'>
        <div className='Signup-container'>
            <h2>Signup</h2>
            <form className='Signup-form'>
                <h3>First Name</h3>
                <input  value={firstname} onChange={(e)=>setfirstname(e.target.value)} required/>
                <h3>Last Name</h3>
                <input value={lastname} onChange={(e)=>setlastname(e.target.value)} required/>
                <h3>Username</h3>
                <input value={username} onChange={(e)=>setusername(e.target.value)}required/>
                <h3>Email</h3>
                <input type='email' value={email} onChange={(e)=>setemail(e.target.value)} required/>
                <h3 >Adresse 1</h3>
                <input value={adresse} onChange={(e)=>setadresse(e.target.value)}  required/>
                <h3>Zip Code</h3>
                <input value={zip} onChange={(e)=>setzip(e.target.value)}  required />
                <h3>Password</h3>
                <input type='password'   value={password} onChange={(e)=>setpassword(e.target.value)}required/>
                <h3>Confirm Password</h3>
                <input type='password' value={confirmpassword} onChange={(e)=>setconfirmpassword(e.target.value)} required/>
                <button onClick={signup}>Signup</button>
            </form>
        </div>
       </section>
       <Footer/>
    </>
    )
}
export default Signup;