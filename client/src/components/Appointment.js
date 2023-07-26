import React from 'react';
import { useParams } from "react-router-dom";
import { useEffect, useState} from 'react';
import axios from 'axios';
import "./Appointment.css";
import { Link } from 'react-router-dom';

const Appointment = () => {
    let { id } = useParams();
    const [patientName, setPatientName] = useState('');
    const [patientEmail, setPatientEmail] = useState('');
    const [doctorName, setdoctorName] = useState('');
    const [doctorEmail, setDoctorEmail] = useState('');
    const [patientProblems, setPatientProblems] = useState('');
    useEffect(() => {
        console.log(id);
        axios.get(`http://localhost:5000/Doctor/${id}`)
        .then((res) => {
            setdoctorName(res.data.name);
            setDoctorEmail(res.data.Email);
        })
        .catch(err => console.log(err));
        const patientInfo = JSON.parse(localStorage.getItem('PatientInfo'));
        // console.log(patientInfo);
        setPatientName(patientInfo.Name);
        setPatientEmail(patientInfo.Email);
        setPatientProblems(patientInfo.Problems.toString());
    }, [])

    const handleSendMail = (e) => {
        e.preventDefault();
        const info = {
            patientInfo: JSON.parse(localStorage.getItem('PatientInfo')),
            DoctorID: id
        }
        axios.post(`http://localhost:5000/Doctor/Appointment/${id}`, info)
        .then((res) => {
            window.location.href = `/feedback/${id}`;
        })
        .catch(err => console.log(err));
    }

  return (
    <div>
        <div class="container mt-5 mb-5 d-flex justify-content-center">
            <div class="card px-1 py-4">
                <div class="card-body">
                    <h6 class="card-title mb-3">This appointment is for</h6>
                    <div class="d-flex flex-row"> <label class="radio mr-1"> <input type="radio" name="add" value="anz" checked/> <span> <i class="fa fa-user"></i> {patientName} </span> </label> <label class="radio"> <input type="radio" name="add" value="add"/></label> </div>
                    <h6 class="card-title mb-3">The doctor that will be seeing you is</h6>
                    <div class="d-flex flex-row"> <label class="radio mr-1"> <input type="radio" name="add" value="anz" checked/> <span> <i class="fa fa-user"></i> {doctorName} </span> </label> <label class="radio"> <input type="radio" name="add" value="add"/></label> </div>
                    <h6 class="information mt-4">Please provide following information about {patientName}</h6>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="name">Prefered name</label> <input class="form-control" type="text" placeholder={patientName}/> </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="name">Symptoms</label> <input class="form-control" type="text" placeholder={patientProblems}/> </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="name">Preferd date and time for appointment</label> <input class="form-control" type="text" placeholder="Name"/> </div>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-sm-12">
                            <div class="form-group">
                                <label for="name">Any message for the doctor</label> <input class="form-control" style={{minHeight:"130px"}} type="text" placeholder=""/> </div>
                        </div>
                    </div>
                    <div class=" d-flex flex-column text-center px-5 mt-3 mb-3"> <small class="agree-text">You will receive a copy of this booking details on the email id 
                    <a href="#" class="terms">  {patientEmail}</a> </small> </div>
                    <Link to={`/feedback/${id}`}><button class="btn btn-primary btn-block confirm-button" onClick={handleSendMail}>Confirm booking</button></Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Appointment