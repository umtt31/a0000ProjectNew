// Imports
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

// Schema
const newsModel = require("./models/reports");

// Error handler
const ExpressError = require("./utils/ExpressError");

// Router Imports
const reportsRouter = require('./routers/reportsRouter.js')
const commentsRouter = require('./routers/commentsRouter.js')

// Database Conection
mongoose.connect("mongodb://127.0.0.1:27017/a0000ProjectNew", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database Connected");
});

// Defining App
const app = express();

// Setting App
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configure App
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// Routers
app.use('/news', reportsRouter)
app.use('/news/:id/comments', commentsRouter)

// Error Handlers
app.all("*", (req, res, next) => {
  next(new ExpressError("Pafe Not Found", 404));
});
app.use((err, req, res, next) => {
  const { statusCode = 500 } = err;
  if (!err.message) err.message = "Something went wrong!";
  res.status(statusCode).render("error", { err });
});

// LISTENING LOCALHOST
app.listen(3000, () => {
  console.log("PORT 3000 RUNNING");
});
