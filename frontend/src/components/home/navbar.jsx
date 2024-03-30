import React, { useState } from "react";
import '../../assets/template.css'
import { Link } from "react-router-dom";
const Navbar = ()=>{
   const [search,setsearch] = useState()


    return(
      <nav>
        <div className="topnavbar-container">
          <div className="lefttopnavbar-container">
            <h3>Welcome To Ecoist</h3>
          </div>
          <div className="righttopnavbar-container">
          {JSON.parse(sessionStorage.getItem("token"))!=undefined || JSON.parse(sessionStorage.getItem("token"))!=""?<Link to="/favorite" style={{textDecoration:"inherit",color:"inherit"}}><i className="fa fa-heart" aria-hidden="true"></i></Link>:""}
          {JSON.parse(sessionStorage.getItem("token"))!=undefined || JSON.parse(sessionStorage.getItem("token"))!=""?<Link to="/cart" style={{textDecoration:"inherit",color:"inherit"}}><i className="fa fa-shopping-cart" aria-hidden="true"></i></Link>:""}
          
          </div>
        </div>
        <div className="navbar-container">
          <div className="navbar-logo">
          <Link to="/" style={{ textDecoration: 'none'}}> <h2><span>Eco</span>ist</h2></Link>
          </div>
          <div className="navbar-search">
            <input placeholder="search...." onChange={(e)=>setsearch(e.target.value)} value={search}/>
            <Link to={`/search?search=${search}`}><button>Search</button></Link>
          </div>
          <div className="navbar-links-container">
             <ul className="navbar-links">
                <Link to="/"><li>Home</li></Link>
                <ul tabIndex="0" className="categories-container" >
                    Categories
                    <div className="categories">
                      <div>
                      <Link to="/products?categorie=Pants"><li>Pants</li></Link>
                      <Link to="/products?categorie=accessory"> <li>Accessories</li></Link>
                      <Link to="/products?categorie=shoes"><li>Shoes</li></Link>
                      </div>
                      <div>
                      <Link to="/products?categorie=electronics"> <li>Electronics</li></Link>
                      <Link to="/products?categorie=tools"><li>Tools</li></Link>
                      <Link to="/products?categorie=Tshirt"><li>Tshirt</li></Link>
                      </div>
                    </div>
                </ul>
                
                {JSON.parse(sessionStorage.getItem("token"))==undefined || JSON.parse(sessionStorage.getItem("token"))==""?<Link to="/login"><li>Login</li></Link>:<Link to="/profile"><li>Profile</li></Link>}
                {JSON.parse(sessionStorage.getItem("token"))==undefined || JSON.parse(sessionStorage.getItem("token"))==""? <Link to="/signup"><li>Sign up</li></Link>:<Link to="/feedback"><li>Feedback</li></Link>}
             </ul>
          </div>
        </div>
      </nav>
    );
}
export default Navbar;