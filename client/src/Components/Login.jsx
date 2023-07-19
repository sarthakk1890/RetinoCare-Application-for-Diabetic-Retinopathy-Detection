import React, { useState } from 'react';
import Front from './Front';
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify';


const Login = () => {

    let navigate = useNavigate();
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ email: credentials.email, password: credentials.password })
            });
            const json = await response.json();
            if (json.success === true) {
                //Storing token in local storage
                localStorage.setItem('token', json.authtoken)
                toast.success("Login Successful", { autoClose: 2000 });
                navigate("/home");
            }
            else {
                toast.error("Wrong Credentials", { autoClose: 2000 });
            }
        } catch (error) {
            toast.error("Internal server error try after few minutes!", { autoClose: 2000 });
        }

    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }

    return (
        <>
            <Front />
            <div className="log_main" id="log_main" style={{ zIndex: '2', position: 'absolute', backgroundColor: 'rgba(0,0,0, 0.5)' }}>
                <div className="login" >
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="exampleInputEmail1">Email address</label>
                            <input type="email" name='email' className="form-control" id="email" onChange={onChange} value={credentials.email} aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="exampleInputPassword1">Password</label>
                            <input type="password" name='password' className="form-control" id="password" onChange={onChange} value={credentials.password} placeholder="Password" />
                        </div>
                        <div className="btn-login">
                            <button type="submit" className="btn btn-primary" >Login</button>
                            <div style={{ fontFamily: 'Times New Roman, Times, serif', marginTop: '4px' }}>
                                Don't have an account? Register <button style={{ all: 'unset', cursor: 'pointer', color: '#4169E1' }}><Link to='/register'>here</Link></button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login