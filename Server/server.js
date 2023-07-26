import express from  'express';
import cors from 'cors';
const app = express();
const PORT = 5000;
import PatientRoute from './Routes/auth.js';
import DoctorRoute from './Routes/Doctor.js';
import FeedbackRoute from './Routes/Feedback.js';
import connect from './config/database.js';
import cookieParser from 'cookie-parser';
app.use(cookieParser());
app.use(express.json());
app.use(cors());

app.use('/Patient',PatientRoute);
app.use('/Doctor',DoctorRoute);
app.use('/Feedback',FeedbackRoute);
connect();  
app.listen(PORT,()=>{
console.log(`Server is Running at ${PORT}`);
})