// Imports
const Joi = require('joi')

// News Schema Validate Schema
module.exports.reportsSchema = Joi.object({
    report: Joi.object({
        title: Joi.string().required(),
        image: Joi.string().required(),
        // publicationDate: { type: Date, default: Date.now() },
        content: Joi.string().required(),
        description: Joi.string().required(),
    })
})

// Comments Schema Validate Schema
module.exports.commentsSchema = Joi.object({
    comments: Joi.object({
        title: Joi.string().required(),
        body: Joi.string().required(),
    })
})
