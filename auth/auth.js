const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

const UserDao = require('../dao/userDao');

router.post('/auth', (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please enter all fields'});
    }

    UserDao.findUserByEmail(email)
    .then((user) => {
        if (!user) {
            return res.status(400).json({ message: 'User does not exist'});
        }

        bcrypt.compare(password, user.password)
        .then((isMatch) => {
            if (!isMatch) return res.status(401).json({ message: 'Invalid credentials'});

            jwt.sign(
                {id: user.id},
                config.get('jwtSecret'),
                {expiresIn: 3600},
                (error, token) => {
                    if (error) throw error;
                    res.json({
                        token,
                        user: {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                    })
                }
            )
        })
    })
});

router.get('/auth/user', auth, (req, res) => {
    UserDao.findUserById(req.user.id)
    .then((user) => {
        res.json(user);
    })
})

module.exports = router;
