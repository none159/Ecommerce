import React,{useState} from "react";
import { Link} from "react-router-dom";
import "../../assets/items.css"

const Singleitem = (props)=>{
    const [items, setItems] = useState(props.item);
    const handleDelete=(id)=>{
        localStorage.setItem("cart",JSON.stringify(JSON.parse(localStorage.getItem("cart")).filter((item)=>item.id!=id)))
        setItems(JSON.parse(localStorage.getItem("cart")))
    }
    return(
     <div style={{paddingBottom:items.quantity!=undefined?"220px":""}}className="item" key={items.id}>
             {items.quantity?<button className="close-button"  onClick={(e) => {
          e.stopPropagation(); 
          handleDelete(items.id);
        }}>X</button>:""}
         <Link style={{ textDecoration: 'none',width:"fit-content" }} to={`/fulldetails?id=${items.id}&categorie=${items.categorie}`}>
            <img loading="lazy" src={items.img} ></img>
            <h2>{items.name}</h2>
            <h3>Price: <span>{items.price}</span></h3>
            {items.size !=undefined&& items.quantity != undefined? <><h3>Size : <span>{items.size}</span></h3><h3>Quantity : <span>{items.quantity}</span></h3></>:""}
        </Link>
        </div>
    )
}
export default Singleitem