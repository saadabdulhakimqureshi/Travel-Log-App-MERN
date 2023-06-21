import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let experiences;

export default class experiencesDAO {
  static async injectDB(conn) {
    if (experiences) {
      return;
    }

    try {
      experiences = await conn
        .db(process.env.TRAVEL_NS)
        .collection("experiences");
    } catch (e) {
      console.error(`Unable to obtain collection handles ${e}`);
    }
  }

  static async addExperience(userInfo, locationInfo, experienceInfo) {
    try {
      const experienceDoc = {
        date: new Date(),
        user_id: userInfo.user_id,
        userName: userInfo.userName,
        location_id: locationInfo.location_id,
        locationName: locationInfo.locationName,
        description: experienceInfo.description,
        travelCost: experienceInfo.travelCost,
        foodCost: experienceInfo.foodCost,
        transportationCost: experienceInfo.transportationCost,
        placesToVisit: experienceInfo.placesToVisit,
      };

      return await experiences.insertOne(experienceDoc);
    } catch (e) {
      return;
    }
  }

  static async getExperiences() {
    try {
      curser = await experiences.find({});
      console.log("Here");
      return curser;
    } catch (e) {
      return;
    }
  }
}
