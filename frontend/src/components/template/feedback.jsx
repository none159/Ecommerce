import React, { useState, useRef, useEffect } from "react";
import Footer from "../home/footer";
import Navbar from "../home/navbar";
import emailjs from '@emailjs/browser';
const Feedback = ()=>{
    const [sent, setsent] = useState(false)
    const sendEmail = (e) => {
        e.preventDefault();

        emailjs.sendForm('service_688u0za', 'template_7sss1ol', form.current, 'airPSi7ELLKj01Y7i')
            .then((result) => {
                console.log(result.text);
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
        <section>
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
        </section>
        <Footer/>
       </>
    )
}
export default Feedback