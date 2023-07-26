import React from 'react';
import { Link } from 'react-router-dom';
import Doctorimg from "../Images/Left-img.png";
import CardPatient from "../Images/Patient.png";
import CardDoctor from "../Images/Doctor.png";
import "./Homepage.css";
const Homepage = () => {
  return (
<div className="Main">
<div className="Left">
  <div className="Doctor_img">
    <img src={Doctorimg} alt="Doctor.png" />
  </div>
</div>
<div className="Right">
  <h1>Welcome to <span>MediClub</span></h1>
  <p>Login As :</p>
  <div className="Cards">
    <div className="New">
    <Link to="/Doctor/Login"> <div className="left_card">
     <img src={CardDoctor} alt="" />
      <p>Doctor</p>
    </div></Link>
    <Link to="/Patient/Login"> <div className="right_card">
   <img src={CardPatient} alt="" />
    <p>Patient</p>
    </div></Link>
    </div>
  </div>
</div>
</div>
  )
}

export default Homepage