const {Router} = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const {check, validationResult} = require('express-validator');
const User = require('../models/user.model');

const router = Router();

router.post(
    '/register',
    [
        check('email', 'Please enter correct email').isEmail(),
        check('name', 'Please enter name').exists(),
        check('password', 'Incorrect password format')
            .isLength({min: 6})
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

            const {email, password, name} = req.body;

            const candidate = await User.findOne({email});

            // @TODO add unique indexes in db and handle exception

            if (candidate) {
                return res.status(409).json({message: 'This email is already used'});
            }

            const img = 'https://www.worldfuturecouncil.org/wp-content/uploads/2020/06/blank-profile-picture-973460_1280-1.png';

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({email, password: hashedPassword, name, img});

            user.save();

            res.status(201).json({message: 'User was created'});

        } catch (e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    });

router.post(
    '/login',
    [
        check('email', 'Please enter correct email').exists(),
        check('password', 'Please enter password').exists()
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

            const {email, password} = req.body;

            const user = await User.findOne({email});

            if (!user) {
                return res.status(400).json({message: 'User was not found'});
            }

            const isPasswordMatch = await bcrypt.compare(password, user.password);

            if (!isPasswordMatch) {
                return res.status(400).json({message: 'Incorrect password. Try again.'});
            }

            const token = jwt.sign(
                {userId: user.id},
                config.get('jwtSecret'),
                {expiresIn: '24h'}
            );

            res.status(200).json({token});

        } catch (e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    });

module.exports = router;
