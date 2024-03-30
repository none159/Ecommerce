import React from "react";
import '../../assets/template.css'
import { Link } from "react-router-dom";
const Footer = ()=>{


    return(
      <footer>
           <div className="footer-container">
              <div className="footer-links">
                  <ul>
                    <Link to="/"><li>Home</li></Link>
                    {JSON.parse(sessionStorage.getItem("token"))==undefined || JSON.parse(sessionStorage.getItem("token"))==""?<Link to="/signup"><li>Sign up</li></Link>:""}
                    {JSON.parse(sessionStorage.getItem("token"))==undefined || JSON.parse(sessionStorage.getItem("token"))==""?<Link to="/login"><li>login</li></Link>:""}
                    {JSON.parse(sessionStorage.getItem("token"))!=undefined || JSON.parse(sessionStorage.getItem("token"))!=""?<Link to="/profile" style={{textDecoration:"inherit",color:"inherit"}}><li>Profile</li></Link>:""}
                    {JSON.parse(sessionStorage.getItem("token"))!=undefined || JSON.parse(sessionStorage.getItem("token"))!=""?<Link to="/favorite" style={{textDecoration:"inherit",color:"inherit"}}><li>Favorites</li></Link>:""}
                  </ul>
              </div>
              <div className="footer-links">
                <ul>
                 <Link to="/about"> <li>About</li></Link>
                  <li>FAQ</li>
                 <Link to="feedback"> <li>Feedback</li></Link>
                </ul>
              </div>
              <div className="footer-links">
                <a><i className="fa fa-github" aria-hidden="true"></i></a>
              </div>
           </div>
      </footer>
    );
}
export default Footer;