// Imports
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating schema
const commentsSchema = new Schema({
    title: String,
    body: String,
})

// Returning page to app.js
module.exports = mongoose.model('Comments', commentsSchema) 
