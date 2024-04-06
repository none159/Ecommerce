import React from "react";
import { Link } from "react-router-dom";
import "../../assets/items.css"

const Singleitem = (props)=>{
    const handleDelete=(id)=>{
        localStorage.setItem("cart",JSON.stringify(JSON.parse(localStorage.getItem("cart")).filter((item)=>item.id!=id)))
    }
    return(
     <div style={{paddingBottom:props.item.quantity!=undefined?"220px":""}}className="item" key={props.item.id}>
             <button className="close-button"  onClick={(e) => {
          e.stopPropagation(); 
          handleDelete(props.item.id);
        }}>X</button>
         <Link style={{ textDecoration: 'none',width:"fit-content" }} to={`/fulldetails?id=${props.item.id}&categorie=${props.item.categorie}`}>
            <img loading="lazy" src={props.item.img} ></img>
            <h2>{props.item.name}</h2>
            <h3>Price: <span>{props.item.price}</span></h3>
            {props.item.size !=undefined&& props.item.quantity != undefined? <><h3>Size : <span>{props.item.size}</span></h3><h3>Quantity : <span>{props.item.quantity}</span></h3></>:""}
        </Link>
        </div>
    )
}
export default Singleitem