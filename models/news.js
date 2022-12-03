const mongoose = require('mongoose')
const Schema = mongoose.Schema

const newsSchema = new Schema({
    title: String,
    image: String,
    publicationDate: { type: Date, default: Date.now() },
    content: String,
    description: String,
})

module.exports = mongoose.model('News', newsSchema)