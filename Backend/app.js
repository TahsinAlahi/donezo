require("dotenv").config();
const cors = require("cors");
const express = require("express");
const createHttpErrors = require("http-errors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from Donezo!!");
});

module.exports = app;
