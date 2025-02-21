const router = require("express").Router();
const createHttpErrors = require("http-errors");
const { tasksCollection } = require("./database");
const { ObjectId } = require("mongodb");

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

// delete the task
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!ObjectId.isValid(id)) throw createHttpErrors(400, "Invalid Id.");

    const deletedTask = await tasksCollection.findOneAndDelete({
      _id: ObjectId.createFromHexString(id),
    });

    if (deletedTask === null) throw createHttpErrors(404, "Task not found.");

    res.status(200).send({ message: "Task deleted successfully." });
  } catch (error) {
    next(createHttpErrors(error));
  }
});

module.exports = router;
