import express from "express";
const router = express.Router();

// If we can reach a route in a collection we make the following api call.
router.route("/").get((req, res) => {
  res.send("Hello world");
});

export default router;
