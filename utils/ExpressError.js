// Creating error class
class ExpressError extends Error {
    constructor(message, statusCode) {
        super()
        this.message = message
        this.statusCode = statusCode
    }
}

// Returning page to app.js
module.exports = ExpressError