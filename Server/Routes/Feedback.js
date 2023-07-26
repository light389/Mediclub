import express from "express";
import Feedback from "../Controllers/Feedback.js";
import Token from "../utils/Jwt.js";
const router = express.Router();

router.post("/Post",Feedback.PostFeedback);
router.post("/:id",Feedback.UpdateUpvotes);
router.get("/",Feedback.getFeedback);


export default router;