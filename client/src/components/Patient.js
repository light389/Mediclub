import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import DoctorCard from './DoctorCard';

const Patient = () => {
    const [doctorData, setDoctorData] = useState([]);
    useEffect(() => {
      const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzVjZmZjZjA5YTMzNTdhMjdkMTRmZDgiLCJpYXQiOjE2NjcwNDAwMTF9.WUrfnyKLESV38rSIMqLDe_osEIL3Ns536AJvNSSWhaY";
        axios.get('http://localhost:5000/Doctor/api/fetch')
        .then(res => console.log(setDoctorData(res.data)))
        .catch(err => console.log(err));
    }, [])

    
  return (
    <div className='m-5'>
      <div className='row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3'>
        {
          doctorData.map((item, key) => {
            console.log(item);
            return <DoctorCard id = {item._id} name = {item.name} qualification = {item.Degrees} specilization = {item.Specialization} upvotes = {item.Upvotes} gender = {item.Gender}/>
          })
        }
      </div>
    </div>
  )
}

export default Patient;