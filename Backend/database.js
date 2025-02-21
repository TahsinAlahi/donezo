const { MongoClient } = require("mongodb");
const mongoUri = process.env.MONGO_URI;

const client = new MongoClient(mongoUri);
const database = client.db("donezo");

const usersCollection = database.collection("users");
const tasksCollection = database.collection("tasks");

module.exports = {
  client,
  usersCollection,
  tasksCollection,
};
