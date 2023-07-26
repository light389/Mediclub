import React, { useState } from 'react';
import axios from 'axios';
import { Navigate,Link } from 'react-router-dom';
import "./Patient.css";
const PatientLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const LoginPatient = async(e) => {
        e.preventDefault();
        const tryPatient = JSON.stringify({
            Email:email,
            Password:password
        });
        console.log(tryPatient);
        axios.post('http://localhost:5000/Patient/Login', tryPatient, {headers:{"Content-Type" : "application/json"}})
        .then((res)=>{
            console.log(res.data);
            if(res.data.status !== 'Error'){
                alert("Login successful");
                localStorage.setItem("PatientInfo", JSON.stringify(res.data));
                window.location.href = "/Patient";
            }
            else{
                alert("Incorrect email or password");
            }
        });
    }
    return (
        <div className='container mt-5'>
            <form onSubmit={LoginPatient}>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value = {email} onChange = {(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value = {password} onChange = {(e)=>setPassword(e.target.value)}/>
            </div>
            <input type="submit" className="btn btn-primary" value = "Login"/>
            </form>

            <Link to="/patient/register"><button className='New_btn'>New Here?</button></Link> 
        </div>
    )
}
export default PatientLogin;