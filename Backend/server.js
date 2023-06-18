// Importing packages.
import express from "express";
import cors from "cors";

// Route will be in a seperate file.
import travel from "./api/travel.route.js";

// Creating express app that we will use to make our server.
const app = express();

app.use(cors()); // Express is going to the cors module.
app.use(express.json()); // Our server can accept json in the body of json

// Specify the router our app will be using.
app.use("/api/v1/travel", travel);

// Req and res will come after last/ Any other route will show this error.
app.use("*", (req, res) => res.status(404).json({ error: "not found" }));

// Exporting the app.
export default app;
