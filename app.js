// Imports
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const ejsMate = require("ejs-mate");
const methodOverride = require("method-override");

// Schema
const newsModel = require("./models/news");

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

// News Part ( WE WILL USE ROUTER JUST FOR NOW EVERYTHING HERE )
// GET REQUEST
app.get("/news", async (req, res) => {
  const news = await newsModel.find({});
  res.render("news/index.ejs", { news });
});
app.get("/news/new", (req, res) => {
  res.render("news/new.ejs");
});
app.get("/news/:id", async (req, res) => {
  const id = req.params.id
  const _new = await newsModel.findById(id);
  res.render("news/show.ejs", { _new });
});
app.get("/news/:id/edit", async (req, res) => {
  const id = req.params.id
  const _new = await newsModel.findById(id);
  res.render("news/edit.ejs", { _new });
});

// POST REQUEST
app.post("/news", async (req, res) => {
  const _new = new newsModel(req.body._new);
  await _new.save();
  res.redirect(`/news/${_new._id}`);
});

// PUT REQUEST
app.put("/news/:id", async (req, res) => {
  const id = req.params.id
  const _new = await newsModel.findByIdAndUpdate(id, { ...req.body._new });
  res.redirect(`/news/${_new._id}`);
});

// DELETE REQUEST
app.delete("/news/:id", async (req, res) => {
  const id = req.params.id
  await newsModel.findByIdAndDelete(id);
  res.redirect("/news");
});

// LISTENING LOCALHOST
app.listen(3000, () => {
  console.log("PORT 3000 RUNNING");
});
