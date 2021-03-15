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

            const {login, password} = req.body;

            const candidate = await User.findOne({login});

            if (candidate) {
                return res.status(409).json({message: 'This login is already used'});
            }

            const hashedPassword = await bcrypt.hash(password, 12);
            const user = new User({login, password: hashedPassword});

            user.save();

            res.status(201).json({message: 'User was created'});

        } catch (e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    });

router.post(
    '/login',
    [
        check('login', 'Please enter login').exists(),
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

            const {login, password} = req.body;

            const user = await User.findOne({login});

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

            res.status(200).json({token, userId: user.id});

        } catch (e) {
            res.status(500).json({message: 'Something went wrong'});
        }
    });

module.exports = router;
