import React, { useEffect, useState } from "react";
import Navbar from "../template/navbar";
import Footer from "../template/footer";
import axios from "axios";
import "../../assets/profile.css"
import profileimg from "../../assets/profileimg/blank-profile-picture-973460_1280.png"
import { useNavigate } from "react-router-dom";

const Profile=()=>{
    const [data,setdata]=useState()
    const [res,setres]= useState()
    const navigate = useNavigate()
    const fetchprofile = async()=>{
         await axios.post("https://ecommerce-frontend-theta-plum.vercel.app/api/users/profile",{
            "email":JSON.parse(sessionStorage.getItem("email"))
         }).then((response)=>{
            if(response.data!=undefined){
            setdata(response.data)
            console.log(response.data)
            }
         })
    }
    const Tokencheck=async()=>{

        const email = JSON.parse(sessionStorage.getItem("email"))
        const token = JSON.parse(sessionStorage.getItem("token"))
        await axios.post("https://ecommerce-frontend-theta-plum.vercel.app/api/users/tokencheck",{
            email:email,
            token:token
        }).then((response)=>{   
          if(response.data!=undefined){
              setres(response.data)
          
          }
    
    }).catch((err)=>{
        console.log(err)
    })
    
    }
    useEffect(()=>{
        fetchprofile()
        Tokencheck()
        if(res == false){
            navigate("/login")
        }
    },[res])
    return(
        <>
        <Navbar/>
        <section className="profile-section">
            <h2 className="profile-title">Profile</h2>
            {data?
            <div className="profile-container">
                <div className="profileimg">
                     <img src={profileimg}/>
                </div>
                <div className="profileinfo">
                    <h2><span>Full Name :</span> {data.fullname}</h2>
                    <h2><span>Username :</span> {data.username}</h2>
                    <h2><span>Email :</span> {data.email}</h2>
                    <h2><span>Adresse :</span> {data.adresse}</h2>
                    <h2><span>CreatedAt :</span> {data.createdAt.replace(/([A-Z])/g ," | ").slice(0,-2)}</h2>
                </div>
            </div>
            
            :""}
        </section>
        <Footer/>
        </>
    )
}
export default Profile;