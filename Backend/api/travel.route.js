import express from "express";
import ExperiencesCtrl from "./experiences.controller.js";
const router = express.Router();

// If we can reach a route in a collection we make the following api call.
router.route("/").get((req, res) => {
  res.send("Hello world");
});

router.route("/experiences").post(ExperiencesCtrl.apiPostExperience);

router.route("/feed").get(ExperiencesCtrl.apiGetExperiences);

export default router;
