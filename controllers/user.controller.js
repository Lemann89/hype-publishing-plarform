const {Router} = require('express');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const uploadImageToStorage = require('../utils/uploadImageToStorage');

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = Router();

router.get("/profile", async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const userId = jwt.decode(token).userId;

        const user = await User.findById(userId, ['email', 'name', 'img', 'description']).populate('posts');

        res.status(200).json(user);
    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.put("/profile", upload.single('image'), async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const userId = jwt.decode(token).userId;

        const newUserData = {
            ...req.body,
        };

        const file = req.file;

        if(file) {
            newUserData.img = await uploadImageToStorage(file);
        }

        await User.updateOne({_id: userId}, newUserData, {new: true});
        res.status(200).json({message: 'User was updated'});
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id, 'email').populate('posts');

        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

module.exports = router;
