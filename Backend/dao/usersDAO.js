import { query } from "express";
import mongodb from "mongodb";
const ObjectId = mongodb.ObjectId;

let users;

export default class UsersDAO {
  static async injectDB(conn) {
    if (users) {
      return;
    }

    try {
      users = await conn.db(process.env.TRAVEL_NS).collection("users");
    } catch (e) {
      console.error(`Unable to obtain collection handles ${e}`);
    }
  }

  static async createUser(name, email_id, password, phoneNumber) {
    try {
      const query = {
        name: name,
        email_id: email_id,
        password: password,
        phoneNumber: phoneNumber,
        experiences: Array(),
      };

      console.log("Creating User.");
      const result = await users.insertOne(query);
      console.log("User created");

      return result;
    } catch (e) {
      console.log("A user already exists with this email.");
      return { error: e.message };
    }
  }

  static async putUserPassword(_id, email_id, newPassword) {
    try {
      const queryGet = {
        _id: { $eq: new ObjectId(_id) },
        email_id: { $eq: email_id },
      };
      const querySet = {
        $set: { password: newPassword },
      };

      console.log("Changing password.");
      const cursor = await users.findOneAndUpdate(queryGet, querySet);

      if (cursor == null) {
        console.log("Password changed failed. User not found!.");
        return null;
      }
      const result = cursor;
      console.log("Password changed");
      return result;
    } catch (e) {
      console.log({ error: e.message });
    }
  }

  static async putUserName(_id, email_id, newName) {
    try {
      const queryGet = {
        _id: { $eq: new ObjectId(_id) },
        email_id: { $eq: email_id },
      };
      const querySet = {
        $set: { name: newName },
      };

      console.log("Changing Name.");
      const cursor = await users.findOneAndUpdate(queryGet, querySet);

      if (cursor == null) {
        console.log("Name changed failed. User not found!.");
        return {};
      }
      console.log("Name changed");
      const result = await cursor;
      return result;
    } catch (e) {
      console.log({ error: e.message });
    }
  }

  static async checkPassword(_id, email_id, password) {
    try {
      const query = {
        _id: { $eq: new ObjectId(_id) },
        email_id: { $eq: email_id },
        password: { $eq: password },
      };

      console.log("Checking password.");
      const cursor = await users.findOne(query);

      if (cursor != null) {
        console.log("Correct password.");
        const result = cursor;
        return result;
      }
      console.log("Incorrect password!");
      return null;
    } catch (e) {
      console.log({ error: e.message });
    }
  }

  static async getUserId(email_id) {
    try {
      console.log(email_id);
      const query = {
        email_id: { $eq: email_id },
      };
      console.log("Getting user id.");
      const cursor = await users.findOne(query);

      if (cursor != null) {
        const result = cursor;
        console.log("User found!");

        return result._id;
      }
      console.log("User not found!");
      return {};
    } catch (e) {
      console.log({ error: e.message });
    }
  }

  static async addUserExperience(
    _id,
    experience_id,
    email_id,
    locationInfo,
    experienceInfo
  ) {
    try {
      const experienceDoc = {
        date: new Date(),
        experience_id: experience_id,
        location_id: locationInfo.location_id,
        locationName: locationInfo.locationName
      };

      const findQuery = { email_id: { $eq: email_id }, _id: { $eq: _id } };
      const updateQuery = { $push: { experiences: experienceDoc } };

      console.log("Adding experience to user profile.");
      const cursor = await users.findOneAndUpdate(findQuery, updateQuery);

      const result = cursor;

      if (result != null) {
        console.log("Experience added.");
        return result;
      }
      console.log("Experience not added.");
      return result;
    } catch (e) {
      console.log({ error: e.message });
    }
  }

  static async deleteUserExperience(
    _id,
    experience_id,
    email_id,
    locationInfo,
    experienceInfo
  ) {
    try {
      const experienceDoc = {
        experience_id: experience_id
      };

      const findQuery = { email_id: { $eq: email_id }, _id: { $eq: _id } };
      const deleteQuery = { $pull: { experiences: experienceDoc } };
      console.log(experienceDoc);
      console.log("Deleting experience from user profile.");
      const cursor = await users.findOneAndUpdate(findQuery, deleteQuery);

      const result = cursor;

      if (result != null) {
        console.log("Experience deleted.");
        return result;
      }
      console.log("Experience not deleted.");
      return result;
    } catch (e) {
      console.log({ error: e.message });
    }
  }
}
