import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
const Feedback = () => {
    let { id } = useParams();
    const [feedback, setFeedback] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [willRecommend, setWillRecommend] = useState(true);
    useEffect(() => {
        axios.get(`http://localhost:5000/Doctor/${id}`)
        .then((res) => {
            setDoctorName(res.data.name);
        })
        .catch(err => console.log(err));
    }, [])
    const handleSubmit = (e) => {
        e.preventDefault();
        const feedbackData = {
            patientInfo: JSON.parse(localStorage.getItem('PatientInfo')),
            Doctor: doctorName,
            Feedback: feedback
        }
        axios.post("http://localhost:5000/Feedback/Post", feedbackData)
        .then(res => console.log(res))
        .catch(err => console.log(err));
        console.log(willRecommend);
        const Vote = (willRecommend?1:0);
        axios.post(`http://localhost:5000/Feedback/${id}`, Vote)
        .then(res => console.log(res))
        .catch(err => console.log(err));
    }
  return (
    <div className='container mt-5'>
        <form onSubmit={handleSubmit}>
            <div id="emailHelp" class="form-text mb-4">Your feedback is valuable to us</div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Patient Name</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Doctor Name</label>
                <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Feedback</label>
                <input type="text" style={{minHeight:"100px"}} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={feedback} onChange={e => setFeedback(e.target.value)}/>
            </div>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Would you recommend Dr. {doctorName} to a friend?</label>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1" checked onChange={e => setWillRecommend(!willRecommend)}/>
                <label class="form-check-label" for="exampleRadios1">
                    Yes
                </label>
                </div>
                <div class="form-check">
                <input class="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="option2" onChange={e => setWillRecommend(!willRecommend)}/>
                <label class="form-check-label" for="exampleRadios2">
                    No
                </label>
            </div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Feedback;