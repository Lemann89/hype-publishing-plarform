const {Schema, model, Types} = require('mongoose');

const schema = new Schema({
    author: {
        type: Types.ObjectId,
        ref: 'User'
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    tags: {
        type: Array
    },
    likes: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: Array
    }
});

module.exports = model('Post', schema);
