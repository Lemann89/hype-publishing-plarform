const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const Post = require('../models/post.model');
const User = require('../models/user.model');
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const HTMLParser = require('node-html-parser');

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

            if(req.file) {
                const base64Image = 'data:image/png;base64, ' + new Buffer(req.file.buffer).toString('base64');
                postData.img = base64Image;
            }

            const post = new Post(postData);
            const user = await User.findById(userId);

            user.posts.push(post._id);
            post.save();
            user.save();

            res.status(200).json({message: 'Post was created'});

        } catch (e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    });

router.get('/', async (req, res) => {
    try {
        const quantity = req.query.quantity;
        const posts = await Post.find({}, {articleMarkup: 0}).populate('author', ['name', 'email']).limit(+quantity);
        res.status(200).json(posts);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id).populate('author', ['name', 'email']);
        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.post('/tag', async (req, res) => {
    try {
        const { tag } = req.body;
        const posts = await Post.find({tags: tag}).populate('author', 'email');
        res.status(200).json(posts);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.put('/:id', async (req, res) => {
    try {
        await Post.updateOne({_id: req.params.id}, req.body, {new: true});
        res.status(200).json({message: 'Post was updated'});
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await Post.deleteOne({_id: req.params.id});
        res.status(200).json({message: 'Post was deleted'});
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

module.exports = router;
