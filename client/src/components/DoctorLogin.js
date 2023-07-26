import React, { useState } from 'react';
import axios from 'axios';
import { json, Link, Navigate } from 'react-router-dom';
import "./Doctor.css";
const DoctorLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const loginDoctor = async(e) => {
        e.preventDefault();
        const tryDoctor = {
            Email:email,
            Password:password
        }
        axios.post('http://localhost:5000/Doctor/Login', tryDoctor)
        .then((res)=>{
            console.log(res.data);
            if(res.data.status !== 'Error'){
                alert("Login successful");
                localStorage.setItem("DoctorInfo", JSON.stringify(res.data));
                window.location.href = "/";
            }
            else{
                alert("Incorrect email or password");
            }
        });
    }
    return (
        <div className='container mt-5'>
            <form onSubmit={loginDoctor}>
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

           <Link to="/doctor/register"><button className='New_btn'>New Here?</button></Link> 
        </div>
    )
}
export default DoctorLogin;