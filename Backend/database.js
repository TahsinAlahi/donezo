const { MongoClient } = require("mongodb");
const mongoUri = process.env.MONGO_URI;

const client = new MongoClient(mongoUri);

module.exports = {
  client,
};
