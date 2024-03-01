import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/Login.css';

const Login = (props) => {
    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({email: "", password: ""});

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
        });

        const json = await response.json();
        // console.log(json);
        if(json.success){
            // save the auth token & redirect
            localStorage.setItem("token", json.authtoken);
            navigate("/");
            props.showAlert("Logged-in successfully", "success");
        }
        else{
            props.showAlert("Invalid Credentials", "danger");
        }
    };

  return (
    <div>
        <form onSubmit={handleSubmit} className='d-flex justify-content-around mt-3'>
            <div id='shadow'>
                <div className='p-5' id='bg'>
                    <div className='text-center position-relative top-0 start-50 translate-middle'>
                        <h1>User Login</h1>
                    <hr/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" name='email' aria-describedby="emailHelp" onChange={onChange} value={credentials.email}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" name='password' onChange={onChange} value={credentials.password}/>
                    </div>
                    <div className='text-center'>
                        <button type="submit" className="btn btn-primary btn-md">Login</button>
                    </div>
                </div>
            </div>
        </form>
    </div>
  )
}

export default Login
