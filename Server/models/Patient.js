import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Geocoder from "../utils/geocode.js";
const PatientSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: true,
    minLength: [6, "Password must be atleast 6 characters"],
  },

  Contact: {
    type: Number,
    required: true,
    minLength: 10,
    MaxLength: 10,
  },

  Gender: {
    type: String,
    required: true,
  },

  Address: {
    type: String,
    required: true,
  },
  Location: {
    type: { type: String ,
    enum: ['Point']},
    required: false,
    coordinates: {
      type:[Number],
      index:'2dsphere'
    },
    formattedAddress: String
  },
  Problems: {
    type: [String],
    require: true,
  },
  tokens:[
    {

      token:{
        type:String,
        required:true
      }
    }
  ]
});

PatientSchema.index({ Location: "2dsphere" });

PatientSchema.pre('save',async function(next){


  const loc = await Geocoder.geocode(this.Address);
 this.Location = {

  type:'Point',
  coordinates: [loc[0].longitude,loc[0].latitude]
 }
  // this.Address = undefined;
  next();
})

PatientSchema.methods.generateAuthToken = async function(){

  try{
let token = jwt.sign({_id:this._id},"kfknpadfoeovnqov");
this.tokens = this.tokens.concat({token:token});
await this.save();
return token;
  }
  catch(err){
throw err;
    

  }


}
export default mongoose.model("Patient",PatientSchema);