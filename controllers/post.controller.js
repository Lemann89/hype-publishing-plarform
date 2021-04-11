const {Router} = require('express');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const HTMLParser = require('node-html-parser');
const multer = require('multer');
const uploadImageToStorage = require('../utils/uploadImageToStorage');

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = Router();

router.post(
    '/',
    upload.single('image'),
    async (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const userId = jwt.decode(token).userId;

            const postData = {
                ...req.body,
                articlePreview: HTMLParser.parse(req.body.articleMarkup).text.substring(0, 450),
                tags: JSON.parse(req.body.tags),
                author: userId,
            };

            const file = req.file;

            if (file) {
                postData.img = await uploadImageToStorage(file);
            }

            const post = new Post(postData);
            const user = await User.findById(userId);

            user.posts.push(post._id);
            post.save();
            user.save();

            res.status(200).json({_id: post._id, message: 'Post was created'});

        } catch (e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    });

router.get('/', async (req, res) => {
    try {
        const quantity = req.query.quantity;
        const posts = await Post.find({}, {articleMarkup: 0}).sort('-date').populate('author', ['name', 'email']).limit(+quantity);
        res.status(200).json(posts);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id).populate('author', ['name', 'email', 'img']);
        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.post('/tag', async (req, res) => {
    try {
        const {tag} = req.body;
        const posts = await Post.find({tags: tag}).populate('author', 'email');
        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.put('/:id',
    upload.single('image'),
    async (req, res) => {
        try {
            const token = req.headers.authorization.split(" ")[1];
            const userId = jwt.decode(token).userId;

            const postData = {
                ...req.body,
                tags: JSON.parse(req.body.tags),
                articlePreview: HTMLParser.parse(req.body.articleMarkup).text.substring(0, 450),
            };

            const file = req.file;

            if (file) {
                postData.img = await uploadImageToStorage(file);
            }

            const postId = req.params.id;

            await Post.findOneAndUpdate({_id: postId, author: mongoose.Types.ObjectId(userId)}, postData, {new: true});
            res.status(200).json({_id: postId, message: 'Post was updated'});
        } catch (e) {
            console.log(e);
            res.status(500).json({message: 'Something went wrong'});
        }
    });

router.delete('/:id', async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const userId = jwt.decode(token).userId;

        await Post.deleteOne({_id: req.params.id, author: mongoose.Types.ObjectId(userId)});
        res.status(200).json({message: 'Post was deleted'});
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

module.exports = router;
