import React, { useState } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';


const PatientRegister = () => {
    
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [genderList, setGenderList] = useState(['', 'male', 'female', 'other']);
    const Add = genderList.map(Add => Add);
    const [gender, setGender] = useState('');
    const [address, setAddress] = useState('');
    const [problems, setProblems] = useState('');
    const handleGenderChange = (e) => setGender(genderList[e.target.value]);
   
    const RegisterPatient = async(e) => {
        e.preventDefault();
        const problem = problems.split(" ");
        const newDoctor = {
            Name:name,
            Contact:contact,
            Email:email,
            Gender: "Male",
            Address: address,
            Problems: problem,
            Password:password,
        }

        console.log(newDoctor);
        axios.post('http://localhost:5000/Patient/Register', newDoctor)
        .then((res) => {
            console.log(res.data.status);
            if(res.data.status === 'Error'){
                alert("Email aready in use. Please use a different email ID");
            }
            else{
                window.location.href = "/patient/login";
            }
        });
    }
  return (
    <div className='container mt-5'>
        <form onSubmit={RegisterPatient}>
        <div id="emailHelp" className="form-text">We'll never share your information with anyone else.</div>
            <div className="mb-3">
                <label for="exampleInputText1" className="form-label">Name</label>
                <input type="text" className="form-control" id="exampleInputText1" value = {name} onChange = {(e)=>setName(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label for="exampleInputText1" className="form-label">Contact number</label>
                <input type="text" className="form-control" id="exampleInputText1" value = {contact} onChange = {(e)=>setContact(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value = {email} onChange = {(e)=>setEmail(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Gender</label>
                <br/>
                < select
                class="form-select form-select-sm"
                aria-label="Default select example"
                onChange={e => handleGenderChange(e)}
                className="browser-default custom-select" >
                {
                    Add.map((_gender, key) => <option key={key}value={key}>{_gender}</option>)
                }
                </select >
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Address</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value = {address} onChange = {(e)=>setAddress(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label for="exampleInputEmail1" className="form-label">Problems</label>
                <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value = {problems} onChange = {(e)=>setProblems(e.target.value)}/>
            </div>
            <div className="mb-3">
                <label for="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" value = {password} onChange = {(e)=>setPassword(e.target.value)}/>
            </div>
            <input type="submit" className="btn btn-primary" value = "Register"/>
        </form>
    </div>
  )
}

export default PatientRegister;