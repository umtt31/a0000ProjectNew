// Imports 
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// Import comments
const Comments = require('./comments')

// Creating schema
const reportsSchema = new Schema({
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
reportsSchema.post('findOneAndDelete', async (doc) => {
    if(doc) {
        await Comments.deleteMany({
            _id: {
                $in: doc.comments,
            }
        })
    }
})

// Returning page to app.js
module.exports = mongoose.model('Reports', reportsSchema)