// Imports 
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Creating schema
const newsSchema = new Schema({
    title: String,
    image: String,
    publicationDate: { type: Date, default: Date.now() },
    content: String,
    description: String,
})

// Returning page to app.js
module.exports = mongoose.model('News', newsSchema)