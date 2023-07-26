import express from "express";
import Doctor from "../Controllers/Doctor_Register.js";
import Token from "../utils/Jwt.js";
const router = express.Router();

// Doctor Fetch by Id
router.get("/:id",Doctor.GetDoctor);

// Doctor Update by Id
router.put("/:id",Doctor.update);

// Doctor Registwr
router.post("/Register",Doctor.register);

// Doctor Login
router.post("/Login", Doctor.login);

router.post("/Appointment/:id",Doctor.mailer);

// SAME FEATURE GETTING NEAREST DOCTOR but POST ROUTE using AGGREGATION
// router.post("/Location",VerifyToken, Doctor.FindDoctor);

// Appointment Route (Get Doctor Based on nearest Location , Maximum Upvotes and Patient Past Problems) - GET ROUTE
router.get("/api/Fetch", Doctor.DoctorFetch);
export default router;

