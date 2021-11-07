const mongoose = require('../db/db')

const PostSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})

const Post = mongoose.model('Post', PostSchema)

module.exports = Post