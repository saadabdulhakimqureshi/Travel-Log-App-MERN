import { json } from "express";
import ExperiencesDAO from "../dao/experiencesDAO.js";

import { ObjectId } from "mongodb";

export default class ExperiencesCtrl {
  static async apiPostExperience(req, res, next) {
    try {
      const userInfo = {
        user_id: req.body.user_id,
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

      const result = await ExperiencesDAO.postExperience(
        userInfo,
        locationInfo,
        experienceInfo
      );
      res.json(result);
      return result;
      const _id = result.insertedId;
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetAllExperiences(req, res, next) {
    try {

      let filters = {};
      if (req.query.locationName) {
        filters.locationName = req.query.locationName;
      } 
      if (req.query.travelCost) {
        filters.travelCost = parseInt(req.query.travelCost);
      } 
      if (req.query.foodCost) {
        filters.foodCost = parseInt(req.query.foodCost);
      } 
      if (req.query.transportationCost) {
        filters.transportationCost = parseInt(req.query.transportationCost);
      }
      console.log(filters)
      const experiencesList = await ExperiencesDAO.getAllExperiences(filters);

      res.json(experiencesList);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetExperienceById(req, res, next) {
    try {
      const _id = req.body._id;
      console.log(_id);
      const experience = await ExperiencesDAO.getExperienceById(_id);
      res.json(experience);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetExperienceId(req, res, next) {
    try {
      const userName = req.body.userName;
      const user_id = req.body.user_id;
      const locationName = req.body.locationName;
      const location_id = req.body.location_id;
      const _id = await ExperiencesDAO.getExperienceId(
        userName,
        user_id,
        locationName,
        location_id
      );

      if (_id != null) {
        res.json({ _id: _id.toString() });
        return _id;
      } else res.json({ _id: null });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteExperienceByDetail(req, res, next) {
    try {
      const userName = req.body.userName;
      const user_id = req.body.user_id;
      const locationName = req.body.locationName;
      const location_id = req.body.location_id;
      const status = await ExperiencesDAO.deleteExperienceByDetail(
        userName,
        user_id,
        locationName,
        location_id
      );
      res.json(status);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteExperienceById(req, res, next) {
    try {
      const _id = req.body._id;
      const status = await ExperiencesDAO.deleteExperienceById(_id);
      res.json(status);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetUserExperiencesById(req, res, next) {
    try {
      const user_id = req.body.user_id;
      const result = await ExperiencesDAO.getUserExperiencesById(user_id);
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetLocationExperiencesById(req, res, next) {
    try {
      const location_id = req.body.location_id;
      const result = await ExperiencesDAO.getLocationExperiencesById(
        location_id
      );
      res.json(result);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}

// Filter on getting all experiences.
// Get all experiences by location_id.
// Get all experiences by user_id.
