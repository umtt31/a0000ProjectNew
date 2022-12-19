// Imports
const express = require("express");
const router = express.Router();

// Error Handlers
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

// Import Schema
const Reports = require("../models/reports");

// Validation Schema
const { reportsSchema } = require("../schemas.js");
const validateReports = (req, res, next) => {
  const { error } = reportsSchema.validate(req.body);
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
    const reports = await Reports.find({});
    res.render("news/index.ejs", { reports });
  })
);
router.get("/new", (req, res) => {
  res.render("news/new.ejs");
});
router.get(
  "/:id",
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const report = await Reports.findById(id).populate('comments');
    if (!report) {
      req.flash("error", "Cannot find that report!");
      return res.redirect("/news");
    }
    res.render("news/show.ejs", { report });
  })
);
router.get(
  "/:id/edit",
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const report = await Reports.findById(id);
    if (!report) {
      req.flash("error", "Cannot find that report!");
      return res.redirect("/news");
    }
    res.render("news/edit.ejs", { report });
  })
);

// POST REQUEST
router.post(
  "/",
  validateReports,
  catchAsync(async (req, res) => {
    const report = new Reports(req.body.report);
    await report.save();
    req.flash("success", "Successfully made a new report!");
    res.redirect(`/news/${report._id}`);
  })
);

// PUT REQUEST
router.put(
  "/:id",
  validateReports,
  catchAsync(async (req, res) => {
    const id = req.params.id;
    const report = await Reports.findByIdAndUpdate(id, { ...req.body.report });
    req.flash("success", "Report successfully updated!");
    res.redirect(`/news/${report._id}`);
  })
);

// DELETE REQUEST
router.delete(
  "/:id",
  catchAsync(async (req, res) => {
    const id = req.params.id;
    await Reports.findByIdAndDelete(id);
    req.flash("success", "Report successfully deleted!");
    res.redirect("/news");
  })
);

// Returning page to app.js
module.exports = router;
