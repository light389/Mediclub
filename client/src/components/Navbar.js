import React from 'react'
import "./Navbar.css";
import Newlogo from "../Images/Newlogo.png";
import Phone from "../Images/phone-call.png";
import Email from "../Images/email.png";
const Navbar = () => {
  return (
   <>
   <div className="Top">
<div className="left">
  <div className="img">
<img src={Newlogo} alt="Newlogo.png" />
<h2>MediClub</h2>
  </div>
</div>
<div className="right">
  <div className="phone">
    <img src={Phone} alt="" />
    <p>8448910995</p>
  </div>
  <div className="email">
  <img src={Email} alt="" />
  <p>Choudharyr976@gmail.com</p>
  </div>
</div>

   </div>
   
   </>
  )
}

export default Navbar