import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import Front from './Front';


const Signup = () => {

    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    })

    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        const { name, email, password, cpassword } = credentials;
        if (password === cpassword) {
            e.preventDefault();
            const response = await fetch('http://localhost:4000/api/auth/createuser', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify({ name: name, email: email, password: password })
            });
            const json = await response.json();
            if (json.success === true) {
                localStorage.setItem('token', json.authtoken)
                toast.success("Account created succesfully",{autoClose: 2000});
                navigate("/home");
            }
            else {
                toast.error("User already exist",{autoClose: 2000});
            }
        }
        else {
            toast.error("Passwords does not match",{autoClose: 2000});
            setCredentials({
                password: '',
                cpassword: ''
            })
            return;
        }
    }

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value })
    }

    return (
        <>
            <Front />
            <div className="log_main" id="log_main2" style={{ zIndex: '2', position: 'absolute', backgroundColor: 'rgba(0,0,0, 0.5)' }}>
                <div className="login register">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter your name" value={credentials.name} onChange={onChange} required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="Enter your email" value={credentials.email} onChange={onChange} required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Enter a password" value={credentials.password} onChange={onChange} minLength={5} required />
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                            <input type="password" className="form-control" id="cpassword" placeholder="Re-enter password" value={credentials.cpassword} onChange={onChange} minLength={5} required />
                        </div>

                        <div className="btn-login">
                            <button type="submit" className="btn btn-primary">Register</button>
                            <div style={{ fontFamily: 'Times New Roman, Times, serif', marginTop: '4px' }}>Already have an account? Login <button style={{ all: 'unset', cursor: 'pointer', color: '#4169E1' }}><Link to='/login'>here</Link></button></div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup