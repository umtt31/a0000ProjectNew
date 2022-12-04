// Imports 
const mongoose = require('mongoose')
const { commentsSchema } = require('../schemas')
const Schema = mongoose.Schema

// Import comments
const commentsModel = require('./comments')

// Creating schema
const newsSchema = new Schema({
    title: String,
    image: String,
    publicationDate: { type: Date, default: Date.now() },
    content: String,
    description: String,
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comments',
        }
    ]
})

// Deleting Middleware
newsSchema.post('findOneAndDelete', async (doc) => {
    if(doc) {
        await commentsModel.deleteMany({
            _id: {
                $in: doc.comments,
            }
        })
    }
})

// Returning page to app.js
module.exports = mongoose.model('News', newsSchema)