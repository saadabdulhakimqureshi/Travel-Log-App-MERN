import { json } from "express";
import UsersDAO from "../dao/usersDAO.js";
import ExperiencesCtrl from "./experiences.controller.js";
import ExperiencesDAO from "../dao/experiencesDAO.js";
export default class UsersCtrl {
  static async apiCreateUser(req, res, next) {
    try {
      const name = req.body.name;
      const email_id = req.body.email_id;
      const phoneNumber = req.body.phoneNumber;
      const password = req.body.password;

      const result = await UsersDAO.createUser(
        name,
        password,
        email_id,
        phoneNumber
      );

      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiPutUserPassword(req, res, next) {
    try {
      const email_id = req.body.email_id;
      const password = req.body.password;
      const newPassword = req.body.newPassword;
      if (email_id != null && password != null && newPassword != null) {
        const _id = await UsersDAO.getUserId(email_id);

        const passwordCheck = await UsersDAO.checkPassword(
          _id.toString(),
          email_id,
          password
        );

        if (passwordCheck != null) {
          const result = await UsersDAO.putUserPassword(
            _id.toString(),
            email_id,
            newPassword
          );

          res.json(result);
          return;
        }
        res.json(null);
      } else {
        console.log("Fields are empty.");
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiPutUserName(req, res, next) {
    try {
      const email_id = req.body.email_id;
      const password = req.body.password;
      const newName = req.body.newName;
      if (email_id != null && password != null && newName != null) {
        const _id = await UsersDAO.getUserId(email_id);

        const passwordCheck = await UsersDAO.checkPassword(
          _id.toString(),
          email_id,
          password
        );

        if (passwordCheck != null) {
          const result = await UsersDAO.putUserName(
            _id.toString(),
            email_id,
            newName
          );

          res.json(result);
          return;
        }
        res.json(null);
      } else {
        console.log("Fields are empty.");
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiAddUserExperience(req, res, next) {
    try {
      const email_id = req.body.email_id;
      const _id = await UsersDAO.getUserId(email_id);
      const userInfo = {
        user_id: _id,
        email_id: req.body.email_id,
        userName: req.body.userName,
      };

      const locationInfo = {
        location_id: req.body.location_id,
        locationName: req.body.locationName,
      };

      const experienceInfo = {
        description: req.body.location_id,

        transportationMethods: req.body.transportationMethods,
        placesToVisit: req.body.placesToVisit,
        travelCost: req.body.travelCost,
        transportationCost: req.body.transportationCost,
        foodCost: req.body.foodCost,
      };

      const experienceResult = await ExperiencesDAO.postExperience(
        userInfo,
        locationInfo,
        experienceInfo
      );

      const experience_id = await ExperiencesDAO.getExperienceId(
        email_id,
        _id,
        locationInfo.locationName,
        locationInfo.location_id
      );


      const result = await UsersDAO.addUserExperience(
        _id,
        experience_id,
        email_id,
        locationInfo,
        experienceInfo
      );

      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteUserExperience(req, res, next) {
    try {
      const email_id = req.body.email_id;
      const _id = await UsersDAO.getUserId(email_id);
      const userInfo = {
        user_id: _id,
        email_id: req.body.email_id,
        userName: req.body.userName,
      };

      const locationInfo = {
        location_id: req.body.location_id,
        locationName: req.body.locationName,
      };

      const experienceInfo = {
        description: req.body.location_id,

        transportationMethods: req.body.transportationMethods,
        placesToVisit: req.body.placesToVisit,
        travelCost: req.body.travelCost,
        transportationCost: req.body.transportationCost,
        foodCost: req.body.foodCost,
      };

      

      const experience_id = await ExperiencesDAO.getExperienceId(
        email_id,
        _id,
        locationInfo.locationName,
        locationInfo.location_id
      );
      console.log(experience_id);
      const result = await UsersDAO.deleteUserExperience(
        _id,
        experience_id,
        email_id,
        locationInfo,
        experienceInfo
      );
      const expereinceResult = await ExperiencesDAO.deleteExperienceById(experience_id);

      

      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
