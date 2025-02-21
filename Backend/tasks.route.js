const router = require("express").Router();
const createHttpErrors = require("http-errors");
const { tasksCollection } = require("./database");
const { Timestamp } = require("mongodb");

// get the tasks of the user
router.get("/", async (req, res, next) => {
  try {
    const { email } = req.query;

    const tasks = await tasksCollection.find({ userEmail: email }).toArray();

    res.status(200).send(tasks);
  } catch (error) {
    next(createHttpErrors(error));
  }
});

// post the user tasks
router.post("/", async (req, res, next) => {
  try {
    const { title, description, category, dueDate } = req.body;

    if (!title || !description || !category || !dueDate)
      throw createHttpErrors(400, "All fields are required.");

    const postTask = {
      title,
      description,
      category,
      userEmail: req.query?.email,
      timestamp: new Date().toISOString(),
      dueDate: new Date(dueDate).toISOString(),
    };

    const { insertedId } = await tasksCollection.insertOne(postTask);
    res.status(201).send({ _id: insertedId, ...postTask });
  } catch (error) {
    next(createHttpErrors(error));
  }
});

module.exports = router;
