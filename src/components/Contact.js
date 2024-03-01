import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './styles/Contact.css';

const Contact = (props) => {
    const navigate = useNavigate();
    const [mail, setMail] = useState({email: "",subject: "", message: ""});
    const onChange = (e) => {
        setMail({...mail, [e.target.name]: e.target.value})
    };

    const handleContactSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/sendmail', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: mail.email,subject: mail.subject, message: mail.message})
        });

        const json = await response.json();
        console.log(json);
        if(json.success){
            // save the auth token & redirect
            localStorage.setItem("token", json.authtoken);
            navigate("/contact");
            props.showAlert("Mail sent successfully", "success");
            alert("Check your Inbox!");
            setMail({email: "",subject: "", message: ""});
        }
        else{
            props.showAlert("Mail not sent", "danger");
        }
    };
  return (
    <>
        <form onSubmit={handleContactSubmit} className='d-flex justify-content-around mt-3'>
            <div id='shadow'>
                <div className='p-5' id='bg'>
                    <div className='text-center position-relative top-0 start-50 translate-middle'>
                        <h1>Contact Us</h1>
                    <hr/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address <span className='text-secondary' id='gmail'> (@gmail)</span></label>
                        <input type="email" className="form-control" name='email' aria-describedby="emailHelp" onChange={onChange} value={mail.email} required/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="subject" className="form-label">Subject</label>
                        <input type="text" className="form-control" name='subject' aria-describedby="emailHelp" onChange={onChange} value={mail.subject}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="message" className="form-label">Message</label>
                        <textarea type="text" className="form-control" name='message' onChange={onChange} value={mail.message} rows={3} required/>
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-outline-primary border-1 rounded btn-md mt-2"><i className="fa-regular fa-paper-plane" style={{color: "#960df2"}}></i> Send</button>
                    </div>
                </div>
            </div>
        </form>
    </>
  )
}

export default Contact
