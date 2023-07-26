import Patient from "../models/Patient.js";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
const Register = async (req, res, next) => {
  try {

    const salt = await bcrypt.genSaltSync(10);
    const hash = await bcrypt.hashSync(req.body.Password,salt);
const Alreadypatient = await Patient.findOne({Email:req.body.Email}).select("+Password");
if(Alreadypatient){
  res.status(400).send("Already Patient Created");
}
else{
    const NewPatient = new Patient({
      Name:req.body.Name,
      Email:req.body.Email,
      Password:hash,
      Contact:req.body.Contact,
      Gender:req.body.Gender,
      Address:req.body.Address,
      Problems:req.body.Problems});
    const savedPatient =  await NewPatient.save();
    res.status(200).json(savedPatient);
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const login = async(req,res,next)=>{

try{
  console.log(req.body.Email);
const ExistingPatient = await Patient.findOne({Email:req.body.Email}).select("+Password");
if(!ExistingPatient){
    res.status(500).json({message:"PATIENT NOT FOUND"});

}
const passcrct = await bcrypt.compare(req.body.Password,ExistingPatient?.Password);
if(!passcrct){
    res.status(500).json({message:"INVALID CREDENTIALS"});
}
else{
const token = await ExistingPatient.generateAuthToken();


res.cookie("AccessToken",token,{
  httpOnly:true,
  expires:new Date(Date.now()+2589200000)
}).status(200).json(ExistingPatient);
}
}
catch(err){
    next(err);
}
}


export default {Register,login};
