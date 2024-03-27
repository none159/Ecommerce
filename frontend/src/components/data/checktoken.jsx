import axios from "axios";
import React, { useState } from "react";
import Login from "./login.jsx";

const Tokencheck=async()=>{

    const email = JSON.parse(sessionStorage.getItem("email"))
    await axios.post("https://ecommerce-pi-self.vercel.app/api/users/tokencheck",{
        email:email
    }).then((response)=>{   
        return response.data

}).catch((err)=>{
    console.log(err)
})

}
export default Tokencheck;
