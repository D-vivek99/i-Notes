import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';

const Signup = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""});

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(credentials.password !== credentials.cpassword) props.showAlert("Invalid Credentials", "danger");
        else{
            const response = await fetch('http://localhost:5000/api/auth/createuser', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password})
            });

            const json = await response.json();
            console.log(json);
            if(json.success){
                // save the auth token & redirect
                localStorage.setItem("token", json.authtoken);
                navigate("/");
                props.showAlert("Account created successfully", "success");
            }
            else{
                props.showAlert("Invalid Credentials", "danger");
            }
        }
    };

  return (
    <>
      <form onSubmit={handleSubmit} className='d-flex justify-content-around mt-3'>
        <div id='shadow'>
            <div className='p-5' id='bg'>
                <div className='text-center position-relative top-0 start-50 translate-middle'>
                    <h1>User Sign-Up</h1>
                    <hr/>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' value={credentials.name} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={credentials.email} onChange={onChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' value={credentials.password} onChange={onChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' value={credentials.cpassword} onChange={onChange} minLength={5} required/>
                </div>
                <div className='text-center'>
                    <button type="submit" className="btn btn-primary btn-md">Signup</button>
                </div>
            </div>
            </div>
        </form>
    </>
  )
}

export default Signup
