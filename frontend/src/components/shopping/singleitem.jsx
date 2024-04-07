import React,{useState} from "react";
import { Link,useNavigate} from "react-router-dom";
import "../../assets/items.css"

const Singleitem = (props)=>{
    const [items, setItems] = useState(props.item);
    const [res,setres]=useState()
    const handleDelete=(id)=>{
       if(!res){
       localStorage.setItem("cart",JSON.stringify(JSON.parse(localStorage.getItem("cart")).filter((item)=>item.id!=id)))
        setItems(JSON.parse(localStorage.getItem("cart")))
        props.setdata(items)
       }
       else{
              const newitems = items.filter((p)=>p.id!=id)
              props.setdata(newitems)
       }

    }
    const Tokencheck=async()=>{

        const email = JSON.parse(sessionStorage.getItem("email"))
        const token = JSON.parse(sessionStorage.getItem("token"))
        if(email && token) {
        await axios.post("https://ecommerce-pi-self.vercel.app/api/users/tokencheck",{
            email:email,
            token:token
        }).then((response)=>{   
          if(response.data!=undefined)
              setres(response.data)
    
    }).catch((err)=>{
        console.log(err)
    })}
    
    }
    return(
        <>
    {items.id?
     <div style={{paddingBottom:items.quantity!=undefined?"170px":""}}className="item" key={items.id}>
             {items.quantity?<button className="close-button"  onClick={() =>
          handleDelete(items.id)}>X</button>:""}
         <Link style={{ textDecoration: 'none',width:"fit-content" }} to={`/fulldetails?id=${items.id}&categorie=${items.categorie}`}>
            <img loading="lazy" src={items.img} ></img>
            <h2>{items.name}</h2>
            <h3>Price: <span>{items.price}</span></h3>
            {items.size !=undefined&& items.quantity != undefined? <><h3>Size : <span>{items.size}</span></h3><h3>Quantity : <span>{items.quantity}</span></h3></>:""}
        </Link>
        </div>:""}
    </>)
}
export default Singleitem