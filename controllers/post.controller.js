const {Router} = require('express');
const multer = require('multer');
const PostService = require("../services/post.service");
const getUserFromRequest = require("../utils/getUserFromRequest");
const normalizePostData = require("../normalizers/post.normalizer");

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = Router();

const postService = new PostService();

router.post(
    '/',
    upload.single('image'),
    async (req, res, next) => {
        const userId = getUserFromRequest(req);
        const postData = await normalizePostData(req.body, req.file, userId);
        const postId = await postService.create(postData, userId).catch(next);

        res.status(200).json({_id: postId, message: 'Post was created'});
    });

router.get('/', async (req, res, next) => {
    const posts = await postService.getAll(req).catch(next);

    res.status(200).json(posts);
});

router.get('/:id', async (req, res, next) => {
    const post = await postService.getById(req.params.id).catch(next);

    res.status(200).json(post);
});

router.put(
    '/:id',
    upload.single('image'),
    async (req, res, next) => {
        const userId = getUserFromRequest(req);
        const postData = await normalizePostData(req.body, req.file, userId);
        const postId = req.params.id;

        await postService.update(postData, postId, userId).catch(next);
        res.status(201).json({_id: postId, message: 'Post was updated'});
    });

router.delete('/:id', async (req, res, next) => {
    const userId = getUserFromRequest(req);

    await postService.delete(req.params.id, userId).catch(next);
    res.status(200).json({message: 'Post was deleted'});
});

module.exports = router;
