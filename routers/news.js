// Imports
const express = require("express");
const router = express.Router();

// Error Handlers
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

// Import Schema
const newsModel = require("../models/news");

// Validation Schema
const { newsSchema } = require("../schemas.js");
const validateNews = (req, res, next) => {
  const { error } = newsSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// GET REQUEST
router.get(
  "/",
  catchAsync(async (req, res) => {
    const news = await newsModel.find({});
    res.render("news/index.ejs", { news });
  })
);
router.get("/new", (req, res) => {
  res.render("news/new.ejs");
});
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const _new = await newsModel.findById(id).populate('comments');
    res.render("news/show.ejs", { _new });
  })
);
router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const _new = await newsModel.findById(id);
    res.render("news/edit.ejs", { _new });
  })
);

// POST REQUEST
router.post(
  "/",
  validateNews,
  catchAsync(async (req, res) => {
    const _new = new newsModel(req.body._new);
    await _new.save();
    res.redirect(`/news/${_new._id}`);
  })
);

// PUT REQUEST
router.put(
  "/:id",
  validateNews,
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const _new = await newsModel.findByIdAndUpdate(id, { ...req.body._new });
    res.redirect(`/news/${_new._id}`);
  })
);

// DELETE REQUEST
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const id = req.params.id;
    await newsModel.findByIdAndDelete(id);
    res.redirect("/news");
  })
);

// Returning page to app.js
module.exports = router;
