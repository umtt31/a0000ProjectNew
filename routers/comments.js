// Imports
const express = require("express");
const router = express.Router({mergeParams: true});

// Error Handlers
const catchAsync = require("../utils/catchAsync");
const ExpressError = require("../utils/ExpressError");

// Import Schema
const commentsModel = require("../models/comments");
const newsModel = require('../models/news')

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
  const comment = new commentsModel(req.body.comments)
  const _new = await newsModel.findById(id)
  _new.comments.push(comment)
  await _new.save()
  await comment.save()
  res.redirect(`/news/${_new._id}`)
}))

// DELETE DELETE COMMENT
router.delete('/:commentId', catchAsync(async (req, res) => {
  const id = req.params.id
  const commentId = req.params.commentId
  await newsModel.findByIdAndUpdate(id, {$pull: {comments: commentId}})
  await commentsModel.findByIdAndDelete(commentId)
  res.redirect(`/news/${id}`)
}))

// Returning page to app.js
module.exports = router;
