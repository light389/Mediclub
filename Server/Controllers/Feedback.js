import Feedback from "../models/Feedback.js";
import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
const PostFeedback = async(req,res,next)=>{


    // Doctor Available 
//     const Vote = req.body.Vote;
//     if(Vote>0){
//  const NewDoctor = await Doctor.findByIdAndUpdate({

//     _id:req.params.id
//  },
//  {
//     $inc:{
//         Upvotes:1
//     }
//  },
//  )
//     }
// else if(Vote<0){
//     const NewDoctor = await Doctor.findByIdAndUpdate({

//         _id:req.params.id
//      },
//      {
//         $inc:{
//             Upvotes:-1
//         }
//      },
//      )
// }

// console.log(req.body);

try{
    const Patient = req.body.patientInfo;
    // const Vote = req.body.Upvote;
const feedback = new Feedback({

Patient:Patient.Name,
Doctor:req.body.Doctor,
Feedback:req.body.Feedback


});



const SavedFeedback = await feedback.save();
res.status(200).json(SavedFeedback);



}
catch(err){
    throw err;
}

}

const getFeedback = async(req,res,next)=>{

    try{
const Feedbacks = await Feedback.find();

res.status(200).json(Feedbacks);
    }
    catch(err){
        throw err;
    }



}

const UpdateUpvotes = async(req,res,next)=>{

    try{

      const Votes = req.body.Vote;
      console.log(Votes);
      


        const Newdoctor = await Doctor.findByIdAndUpdate(req.params.id,{
            $inc:{
                Upvotes:Votes
            }
        })
           
       res.status(200).json(Newdoctor);
        
    }

    catch(err){


    }


}

export default {PostFeedback,getFeedback,UpdateUpvotes};