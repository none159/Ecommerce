import React, { useEffect } from "react";
import Tokencheck from "./checktoken";

const Token = (token,email)=>{
  const savetoken = ()=>{
   if(token!=undefined && email!=undefined){
    sessionStorage.setItem('token',JSON.stringify(token))
    sessionStorage.setItem("email",JSON.stringify(email))
   }
  }
   const gettoken =()=>{
    const tokenString = sessionStorage.getItem('token');
    const emailString= sessionStorage.getItem("email");
    const userToken = tokenString!=undefined||Tokencheck()?JSON.parse(tokenString):"";
     if(userToken!="" && emailString!=undefined)return userToken.token 
     else {
      savetoken()
    };
   }
  gettoken()
}
export default Token;