import app from "./server.js";
import mongodb from "mongodb";
// Importing database connection.
import dotenv from "dotenv";

// Setting up MongoDB connection.
dotenv.config();
const MongoClient = mongodb.MongoClient;
const port = process.env.PORT || 8000;

// Connecting to MongoDB.
MongoClient.connect(
  // Connecting to restaurant database.
  process.env.RESTREVIEWS_DB_URI,
  {
    wtimeoutMS: 2500,
  }
)

  //Connection failed then application closes.
  .catch((err) => {
    console.error(err.stack);
    process.exit(1);
  })

  .then(async (client) => {
    //After our database is connected we only then start our web server.

    // Connecting to all collections inside database.

    app.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  });
