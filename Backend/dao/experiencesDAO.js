import { query } from "express";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let experiences;

export default class ExperiencesDAO {
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

  static async postExperience(userInfo, locationInfo, experienceInfo) {
    try {
      const experienceDoc = {
        date: new Date(),
        userName: userInfo.userName,
        user_id : userInfo.user_id,
        email_id: userInfo.email_id,
        location_id: locationInfo.location_id,
        locationName: locationInfo.locationName,
        description: experienceInfo.description,
        travelCost: experienceInfo.travelCost,
        foodCost: experienceInfo.foodCost,
        transportationCost: experienceInfo.transportationCost,
        placesToVisit: experienceInfo.placesToVisit,
      };

      console.log("Inserting Record.");
      const result = await experiences.insertOne(experienceDoc);
      console.log("Record Successfully Inserted.");
      return result;
    } catch (e) {
      return;
    }
  }

  static async getAllExperiences() {
    try {
      console.log("Accessing records.");
      const cursor = await experiences.find();

      if ((await cursor.count()) == 0) {
        console.log("Records not found.");
        const experiencesList = {};
        return experiencesList;
      } else {
        const experiencesList = {
          experiencesList: await cursor.toArray(),
          totalExperiences: await cursor.count(),
        };
        console.log("Records successfully accessed.");
        return experiencesList;
      }
    } catch (e) {
      return;
    }
  }

  static async getExperienceById(experience_id) {
    try {
      const query = { _id: { $eq: new ObjectId(experience_id) } };

      console.log("Accessing record.");
      const cursor = await experiences.find(query);
      if ((await cursor.count()) == 0) {
        console.log("Record not found.");
        const experience = {};
        return experience;
      } else {
        const experience = await cursor.toArray();
        console.log("Successfully Accessed Record.");
        return experience;
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async deleteExperienceByDetail(
    userName,
    user_id,
    locationName,
    location_id
  ) {
    try {
      const query = {
        locationName: { $eq: locationName },
        location_id: { $eq: location_id },
        userName: { $eq: userName },
        user_id: { $eq: user_id },
      };

      console.log("Deleting record.");
      const status = await experiences.findOneAndDelete(query);

      if (status.value != null) {
        console.log("Successfully deleted record.");
        return status;
      } else {
        console.log("Record not found.");
        return {};
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async getExperienceId(email_id, user_id, locationName, location_id) {
    try {
      const query = {
        locationName: { $eq: locationName },
        location_id: { $eq: location_id },
        email_id: { $eq: email_id },
        user_id: { $eq: user_id },
      };
      console.log("Accessing record.");
      const cursor = await experiences.findOne(query);
      const result = await cursor;
      if (result != null) {
        console.log("Successfully accessed record.");
        return result._id;
      } else {
        console.log("Record not found");
        return null;
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async deleteExperienceById(_id) {
    try {
      const query = {
        _id: { $eq: new ObjectId(_id) },
      };
      console.log("Deleting record.");
      const status = await experiences.findOneAndDelete(query);
      if (status.value != null) {
        console.log("Successfully deleted record.");
        return status;
      } else {
        console.log("Record not found.");
        return {};
      }
      return status;
    } catch (e) {
      console.error(e);
    }
  }

  static async getUserExperiencesById(user_id) {
    try {
      const query = { user_id: { $eq: user_id } };
      console.log("Finding user experiences.");
      const cursor = await experiences.find(query);
      const documentCount = await cursor.count();
      if (documentCount > 0) {
        console.log("User has " + documentCount.toString() + " experiences.");
        const experiencesList = await cursor.toArray();
        return { experiencesList, documentCount };
      } else {
        console.log("This user does not have any experiences.");
        return {};
      }
    } catch (e) {
      console.error(e);
    }
  }

  static async getLocationExperiencesById(location_id) {
    try {
      const query = { location_id: { $eq: location_id } };
      console.log("Finding location experiences.");
      const cursor = await experiences.find(query);
      const documentCount = await cursor.count();
      if (documentCount > 0) {
        console.log(
          "Location has " + documentCount.toString() + " experiences."
        );
        const experiencesList = await cursor.toArray();
        return { experiencesList, documentCount };
      } else {
        console.log("This location does not have any experiences.");
        return {};
      }
    } catch (e) {
      console.error(e);
    }
  }
}
