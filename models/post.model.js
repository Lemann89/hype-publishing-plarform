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
    articleMarkup: {
        type: String,
        required: true
    },
    articlePreview: {
        type: String,
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
    img: {
        type: String,
    },
    comments: {
        type: Array
    }
});

module.exports = model('Post', schema);
