import axios from "axios";
import React, { useState } from "react";
import Login from "./login.jsx";

const Tokencheck=async()=>{

    const email = JSON.parse(sessionStorage.getItem("email"))
    await axios.post("https://https://ecommerce-server-3gc3d7lb9-yassines-projects-51a48afb.vercel.app/api/users/tokencheck",{
        email:email
    }).then((response)=>{   
        return response.data

}).catch((err)=>{
    console.log(err)
})

}
export default Tokencheck;
