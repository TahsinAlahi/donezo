require("dotenv").config();
const cors = require("cors");
const express = require("express");
const createHttpErrors = require("http-errors");
const cookieParser = require("cookie-parser");

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173", "https://donezo-stuff.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello from Donezo!!");
});

app.use("/tasks", require("./routes/tasks.route"));
app.use("/users", require("./routes/users.route"));

app.use("*", (req, res, next) => {
  next(createHttpErrors(404, "Route not found"));
});

app.use((err, req, res, next) => {
  let errorCode = 500;
  let errorMessage = "Something went wrong";

  if (createHttpErrors.isHttpError(err)) {
    errorCode = err.status;
    errorMessage = err.message;
  }

  console.error(errorCode, errorMessage);
  console.error(err);
  res.status(errorCode).send({ message: errorMessage });
});

module.exports = app;
