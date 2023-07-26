import mongoose from "mongoose";
import Geocoder from "../utils/geocode.js";
import jwt from "jsonwebtoken";
const DoctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  Email: {
    type: String,
    required: true,
  },

  Password: {
    type: String,
    required: [true, "Please Enter a Password"],
    minLength: [6, "Password must be atleast 6 characters"],
    select: false,
  },

  Contact: {
    type: Number,
    required: true,
  },

  Gender: {
    type: String,
    required: true,
  },

  Degrees: {
    type: [String],
    required: true,
  },

  Specialization: {
    type: [String],
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

  Upvotes: {
    type: Number,
    min: 0,
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




DoctorSchema.index({ Location: "2dsphere" });

DoctorSchema.pre('save',async function(next){


  const loc = await Geocoder.geocode(this.Address);
 this.Location = {

  type:'Point',
  coordinates: [loc[0].longitude,loc[0].latitude]
 }
  // this.Address = undefined;
  this.Upvotes = 0;
  next();
})

DoctorSchema.methods.generateAuthToken = async function(){

  try{
let token = jwt.sign({_id:this._id},"asadddsdsddsdsd");
this.tokens = this.tokens.concat({token:token});
await this.save();
return token;
  }
  catch(err){

    throw err;
}};
const Doctor = mongoose.model("Doctor", DoctorSchema);
export default Doctor;
