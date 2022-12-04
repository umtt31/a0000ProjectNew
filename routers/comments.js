// Imports
const express = require("express");
const router = express.Router({mergeParams: true});

// Error Handlers
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

// Import Schema
const comments = require("../models/comments");

// Validation Schema
const { commentsSchema } = require("../schemas.js");
const validateComments = (req, res, next) => {
  const { error } = commentsSchema.validate(req.body);
  if (error) {
    const msg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(msg, 400);
  } else {
    next();
  }
};

// Returning page to app.js
module.exports = router;
