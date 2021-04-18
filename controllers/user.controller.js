const {Router} = require('express');
const multer = require('multer');
const getUserFromRequest = require("../utils/getUserFromRequest");
const UserService = require("../services/user.service");
const normalizeUserData = require("../normalizers/user.normalizer");

const upload = multer({
    storage: multer.memoryStorage(),
});

const router = Router();

const userService = new UserService();

router.get("/profile", async (req, res, next) => {
    const userId = getUserFromRequest(req);
    const user = await userService.getById(userId).catch(next);

    res.status(200).json(user);
});

router.put(
    "/profile",
    upload.single('image'),
    async (req, res, next) => {
        const userId = getUserFromRequest(req);
        const userData = await normalizeUserData(req.body, req.file);

        console.log(userData);

        await userService.update(userData, userId).catch(next);
        res.status(200).json({message: 'User was updated'});
    });

router.get("/:id", async (req, res, next) => {
    const user = await userService.getById(req.params.id).catch(next);

    res.status(200).json(user);
});

module.exports = router;
