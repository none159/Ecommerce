import axios from "axios";
import React, { useState } from "react";
import Login from "./login.jsx";

const Tokencheck=async()=>{

    const email = JSON.parse(sessionStorage.getItem("email"))
    await axios.post("http://127.0.0.1:5000/api/users/tokencheck",{
        email:email
    }).then((response)=>{   
        return response.data

}).catch((err)=>{
    console.log(err)
})

}
export default Tokencheck;
