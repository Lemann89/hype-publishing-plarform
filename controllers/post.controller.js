const {Router} = require('express');
const {check, validationResult} = require('express-validator');
const jwt = require('jsonwebtoken');
const Post = require('../models/post.model');
const User = require('../models/user.model');

const router = Router();

router.post(
    '/add',
    [
        check('title', 'Please enter title').exists(),
        check('text', 'Please enter text').exists()
    ],
    async (req, res) => {
        try {
            const errors = validationResult(req);

            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: 'Incorrect data'
                });
            }

            const { title, text, tags } = req.body;
            const token = req.headers.authorization.split(" ")[1];
            const userId = jwt.decode(token).userId;

            const post = new Post({title, text, tags, author: userId});
            const user = await User.findById(userId);


            user.posts.push(post._id);
            console.log(user.posts);
            post.save();
            user.save();

            res.status(200).json({message: 'Post was created'});

        } catch (e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    });

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'login');
        res.status(200).json(posts);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.get('/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const post = await Post.findById(id).populate('author', 'login');
        res.status(200).json(post);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.post('/tag', async (req, res) => {
    try {
        const { tag } = req.body;
        const posts = await Post.find({tags: tag}).populate('author', 'login');
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
