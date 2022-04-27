const express = require("express");
const cors = require("cors");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const app = express();
app.use(express.json());
app.use(cors());
const recipeRouter = require("./Routes/recipeRouter");
app.use(express.urlencoded({ extended: true }));
app.use("/recipes", recipeRouter);

app.use(express.static(path.join(__dirname, "public")));

// this is wildcard API to handle the wrong url
app.get("*", (req, res, next) => {
  const err = new Error("sorry,this is invalid url");
  err.status = "fail";
  err.statusCode = "404";
  next(err);
});

// app.use((err, req, res, next) => {
//   err.statusCode = err.statusCode || 500;
//   err.status = err.status || "fail";
//   res.status(err.statusCode).json({
//     status: err.status,
//     message: err.message,
//     errors: err.errors || [],
//   });
// });

app.use((err, req, res, next) => {
  if (
    err.name === "MongoError" ||
    err.name === "ValidationError" ||
    err.name === "CastError"
  ) {
    err.status = 422;
  }
  if (req.get("accept").includes("json")) {
    res
      .status(err.status || 500)
      .json({ message: err.message || "some error eccured. " });
  } else {
    res
      .status(err.status || 500)
      .sendFile(path.join(_dirname, "public", "index.html"));
  }
});
module.exports = app;
