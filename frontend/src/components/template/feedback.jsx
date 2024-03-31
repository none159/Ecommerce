import React, { useState, useRef, useEffect } from "react";
import Footer from "../home/footer";
import Navbar from "../home/navbar";
import "../../assets/feedback.css"
import dotenv from "dotenv"
import emailjs from '@emailjs/browser';
dotenv.config()
const Feedback = ()=>{
    const [sent, setsent] = useState(false)
    const form = useRef();
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm(import.meta.env.VITE_EMAILJS_SERVICE, import.meta.env.VITE_EMAILJS_TEMPLATE, form.current, import.meta.env.VITE_EMAILJS_KEY)
            .then((result) => {
                console.log(process.env.REACT_APP_EMAILJS_SERVICE);
                e.target.reset();
                setsent(true)
            }, (error) => {
                console.log(error.text);
            });
    };

    useEffect(() => {
        const clearpopup = setTimeout(() => {
            setsent(false)
        }, 3000);

    }, [sent])
    return(
       <>
       <Navbar/>
        <section className="feedback-section">
        <div className="contacts">
                    <div>
                        <h2 className="contact-title">Contacts</h2>
                        <div className="contact-information">
                            <h3><span style={{ color: "white", textDecoration: "none" }}>*Email : </span>yassinemouhib684@gmail.com</h3>
                            <h3><span style={{ color: "white", textDecoration: "none" }}>*Number : </span>--------------</h3>
                        </div>
                    </div>
                    <h2 className="contactform-title">Write Your Message Here : </h2>
                    <div className="contactform">

                        <form ref={form} onSubmit={sendEmail}>
                            <label htmlFor="Name">Name :</label>
                            <input name="Name"></input>
                            <label htmlFor="Email">Email :</label>
                            <input name="Email"></input>
                            <label htmlFor="Message">Message :</label>
                            <textarea name="Message" id="Message" aria-expanded="false"></textarea>
                            <input type="submit" value="Send" />

                        </form>
                        {sent ? <h2 className="successfull">Message Sent.</h2> : ""}

                    </div>
                </div>
        </section>
        <Footer/>
       </>
    )
}
export default Feedback