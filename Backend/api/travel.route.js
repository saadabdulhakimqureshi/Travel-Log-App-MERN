import express from "express";
import ExperiencesCtrl from "./experiences.controller.js";
import UsersCtrl from "./users.controller.js";
const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello world");
});

// Main feed.
router
  .route("/feed")
  .get(ExperiencesCtrl.apiGetAllExperiences)
  .post(ExperiencesCtrl.apiPostExperience)
  .delete(ExperiencesCtrl.apiDeleteExperienceByDetail);

// User
router.route("/user").post(UsersCtrl.apiCreateUser);

// Getting user details.
router.route("/user/profile");

// Getting user experiences.
router
  .route("/user/experiences")
  .post(UsersCtrl.apiAddUserExperience)
  .get(ExperiencesCtrl.apiGetUserExperiencesById)
  .delete(UsersCtrl.apiDeleteUserExperience)
  .put();

// Updating user details
router.route("/user/profile/password").put(UsersCtrl.apiPutUserPassword);
router.route("/user/profile/name").put(UsersCtrl.apiPutUserName);

router
  .route("/experiences/id")
  .get(ExperiencesCtrl.apiGetExperienceById)
  .delete(ExperiencesCtrl.apiDeleteExperienceById);

router.route("/experiences/id/fetch").get(ExperiencesCtrl.apiGetExperienceId);

export default router;
