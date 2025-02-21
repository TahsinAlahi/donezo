const router = require("express").Router();
const createHttpErrors = require("http-errors");
const { tasksCollection } = require("./database");

router.get("/", async (req, res, next) => {
  try {
    const { email } = req.query;

    const tasks = await tasksCollection.find({ userEmail: email }).toArray();

    res.status(200).send(tasks);
  } catch (error) {
    next(createHttpErrors(error));
  }
});

module.exports = router;
