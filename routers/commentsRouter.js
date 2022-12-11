// Imports
const express = require("express");
const router = express.Router({mergeParams: true});

// Error Handlers
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

// Import Schema
const Comments = require("../models/comments");
const Reports = require('../models/reports')

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

// POST NEW COMMENT
router.post('/', validateComments, catchAsync(async (req, res) => {
  const id = req.params.id
  const comment = new Comments(req.body.comments)
  const report = await Reports.findById(id)
  report.comments.push(comment)
  await report.save()
  await comment.save()
  res.redirect(`/news/${report._id}`)
}))

// DELETE DELETE COMMENT
router.delete('/:commentId', catchAsync(async (req, res) => {
  const id = req.params.id
  const commentId = req.params.commentId
  await Reports.findByIdAndUpdate(id, {$pull: {comments: commentId}})
  await Comments.findByIdAndDelete(commentId)
  res.redirect(`/news/${id}`)
}))

// Returning page to app.js
module.exports = router;
