const mongoose = require('mongoose')

const Schema = mongoose.Schema

const thoughtSchema = new Schema ({
    title: {
        type: String,
        required: true
    },
    snippet: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Thought = mongoose.model('thought', thoughtSchema)

module.exports = Thought