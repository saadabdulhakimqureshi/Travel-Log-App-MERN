import ExperiencesDAO from "../dao/experiencesDAO.js";

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

        placesToVisit: req.body.placesToVisit,
        travelCost: req.body.travelCost,
        transportationCost: req.body.transportationCost,
        foodCost: req.body.foodCost,
      };
      await ExperiencesDAO.addExperience(
        userInfo,
        locationInfo,
        experienceInfo
      );

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetExperiences(req, res, next) {
    try {
      console.error("Here");
      result = await ExperiencesDAO.getExperiences();
      res.json(result);
      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e });
    }
  }
}
