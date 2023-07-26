import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import nodemailer from "nodemailer";
// Register New Doctor
const register = async (req, res) => {
  try {
 const AlrDoctor = await Doctor.findOne({Email:req.body.Email});
  if (AlrDoctor) {
      res.status(400).json({ message: "This Doctor already exists" });
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(req.body.Password,salt);

      const doctor = new Doctor({
        name:req.body.Name,
        Email:req.body.Email,
        Password:hash,
        Contact:req.body.Contact,
        Gender:req.body.Gender,
        Degrees:req.body.Degrees,
        Specialization:req.body.Specialization,
        Address:req.body.Address,
        Problems:req.body.Problems
      });
      const SavedDoctor = await doctor.save();
      res.status(200).json(SavedDoctor);
    }
  } catch (err) {
    throw err;
  }
};
// Login Doctor
const login = async(req,res,next)=>{

  try{
  const ExistingDoctor = await Doctor.findOne({Email:req.body.Email}).select("+Password");
  if(!ExistingDoctor){
      res.status(500).json({message:"DOCTOR NOT FOUND"});
  
  }
  const passcrct = await bcrypt.compare(req.body.Password,ExistingDoctor?.Password);
if(!passcrct){
    res.status(500).json({message:"INVALID CREDENTIALS"});
}
  else{

 const token = await ExistingDoctor.generateAuthToken();
    
 res.cookie("DoctorToken",token,{
    httpOnly:true,
    expires:new Date(Date.now()+2589200000)
  }).status(200).json(ExistingDoctor);

}

  }
  catch(err){
      next(err);
  }
  }
  
// Update Existing Doctor
const update = async(req,res)=>{
try{
const updatedDoctor = await Doctor.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})

res.status(200).json(updatedDoctor);

}
catch(err){
res.status(500).json(err);
}
}

// Get a Doctor by Doctor ID
const GetDoctor = async(req,res,next)=>{
  try{
  const doctor = await Doctor.findById(req.params.id);
  
  res.status(200).json(doctor);
  
  
  }
  catch(err){
  res.status(500).json(err);
  }
  }
// Get Doctor by Upvotes and Nearest Location
// Not Currently Needed
// const FindDoctor = async (req,res,next)=>{

//   try{
//     const latitude = req.body.latitude;
//     const longitude = req.body.longitude;
   
// const NearDoctor = await Doctor.aggregate([
// {

//   $geoNear:{
//     near:{type:"Point",coordinates:[parseFloat(longitude),parseFloat(latitude)]},
//     key:"Location",
//     maxDistance: parseFloat(100)*1609,
//     distanceField:"dist.calculated",
//     spherical:true,
//     query:{Upvotes:{$gt:20}}

//   }
// }

// ]);
// // console.log(NearDoctor);

// res.status(200).send({success:true,msg:"Doctor Details",data:NearDoctor});
//   }
//   catch(err){
//     throw err;
//   }
// }

const DoctorFetch = async (req,res,next)=>{


try{
// Get Patient
const NewPatient = req.rootPatient;

  // let latitude=NewPatient.Location.coordinates[1];
  // let longitude=NewPatient.Location.coordinates[0];
  let latitude = "28.7403029";
  let longitude = "77.1127616";


const Newdoctor = await Doctor.find({

  Location:{
    $near:{

      $geometry:{
        type:"Point",
        coordinates:[ parseFloat(longitude),parseFloat(latitude)]
      },
      $maxDistance : (10)*160000,
      
    }
  },
  Upvotes:{$gt:30},
  Problems:{$all:["Cough", "Fever", "Psychiatrist", "Bone Problems"]}
});





// console.log(NewPatient.Location.coordinates[0]);

res.status(200).json(Newdoctor);
}

catch(err){

throw err;

}

}
const Send = async (req, res) => {
  res.send("YEHA PE DOCTOR REGISTRATION FORM HOGAAA");
};

const mailer = async(req,res,next)=>{
  console.log(req.body.patientInfo);
  try{
    const NewPatient = req.body.patientInfo;
    console.log(NewPatient);
    const NewDoctor = await Doctor.findById(req.params.id);
    console.log(NewDoctor.Email);
const output = `
<p>You Got a New Patient</p>
<h3>Hey This is a New Patient </h3>
<ul>
<li>Name:${NewPatient.Name}</li>
<li>Email:${NewPatient.Email}</li>
<li>Contact:${NewPatient.Contact}</li>
<li>Problems:${NewPatient.Problems}</li>
<li>Address:${NewPatient.Address}</li>
</ul>
`;
const msg = {
    from:"test11112221@gmail.com",
    to:NewDoctor.Email,
subject:"nodemailer testing",
    html:output
};

nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:"test11112221@gmail.com",
        pass:"gndggxukfgsbeijo"
    },
    port:465,
    host:'smtp.gmail.com'
}).sendMail(msg,(err)=>{
    if(err){
        console.log(err);
        
    }
    else{
        console.log("Mail sent Succesfully");
        res.status(200).send("Correct Response");
        
    }
})
  

  }
  catch(err){

throw err;
  }
}
export default { register, Send ,update,GetDoctor,DoctorFetch,login,mailer};