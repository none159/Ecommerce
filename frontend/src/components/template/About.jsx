import React from "react";
import "../../assets/about.css"
import Navbar from "../home/navbar";
import Footer from "../home/footer";
const About = ()=>{
    return(
        <>
        <Navbar/>
        <section className="about-section">
        <h2>About</h2>
        <h3>In this MERN eCommerce project, I've built a user-friendly platform. It features easy product browsing, a simple shopping cart, and a way to save favorites—all securely stored. Users can sign up and make payments safely, making shopping hassle-free.</h3>
        </section>
        <Footer/>
        </>
    )
}
export default About;