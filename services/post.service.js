const Post = require('../models/post.model');
const User = require('../models/user.model');
const mongoose = require("mongoose");

class PostService {

    getAll(req) {
        const {quantity, tag} = req.query;

        if(tag) {
            return Post.find({tags: tag}).populate('author', ['name', 'email']);
        }

        return Post.find({}, {articleMarkup: 0})
            .sort('-date')
            .populate('author', ['name', 'email'])
            .limit(+quantity);
    }

    getById(id) {
        return Post.findById(id).populate('author', ['name', 'email', 'img']);
    }

    async create(data, userId) {
        const post = new Post(data);
        const user = await User.findById(userId);

        user.posts.push(post._id);
        post.save();
        user.save();

        return post._id;
    }

    update(data, id, userId) {
        return Post.findOneAndUpdate({_id: id, author: mongoose.Types.ObjectId(userId)}, data, {new: true});
    }

    delete(id, userId) {
        return Promise.all([
            Post.deleteOne({_id: id, author: mongoose.Types.ObjectId(userId)}),
            User.updateOne({_id: userId}, {$pull: {'posts': id}})
        ]);
    }
}

module.exports = PostService;
