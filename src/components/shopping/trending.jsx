import React from "react";
import { useLocation,Link } from "react-router-dom";
import Navbar from "../template/navbar";
import "../../assets/items.css"
import Footer from "../template/footer";
import Singleitem from "./singleitem";

const Trending = ()=>{
    const location = useLocation()
    const { from } = location.state
    console.log(from)
    return(
        <>
        <Navbar/>
        <h2 className="item-category">Trending</h2>
        <section className="items-section">
           {from!=undefined?from.map((p)=>{
                return(
                 <Singleitem item={p}/>
                )
           }):""}
        </section>
        <Link to={`/`}><button className="back">Back</button></Link>
        <Footer/>
        </>
    )
}
export default Trending;