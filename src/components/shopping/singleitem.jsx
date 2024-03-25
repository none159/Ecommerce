import React from "react";
import { Link } from "react-router-dom";
import "../../assets/items.css"
import LazyLoad from "react-lazyload";
const Singleitem = (props)=>{
    return(
      <Link style={{ textDecoration: 'none',width:"fit-content" }} to={`/fulldetails?id=${props.item.id}&categorie=${props.item.categorie}`}><div className="item" key={props.item.id}>
        <LazyLoad height={300} offset={100}>
            <img src={props.item.img}></img>
            </LazyLoad>
            <h2>{props.item.name}</h2>
            <h3>Price: <span>{props.item.price}</span></h3>
            {props.item.size !=undefined&& props.item.quantity != undefined? <div><h3>Price : <span>{props.item.size}</span></h3><h3>Quantity : <span>{props.item.quantity}</span></h3></div>:""}
        </div>
        </Link>
    )
}
export default Singleitem