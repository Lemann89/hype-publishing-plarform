const {Router} = require('express');
const User = require('../models/user.model');

const router = Router();

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id, 'login').populate('posts');
        res.status(200).json(user);
    } catch (e) {
        res.status(500).json({message: 'Something went wrong'});
    }
});

module.exports = router;
