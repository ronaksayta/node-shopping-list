const userDao = require('../dao/userDao');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');

const userService = {
    registerUser
}

function registerUser(user) {
    return new Promise((resolve, reject) => {
        const { name, email, password } = user;
        if (!name || !email || !password) {
            reject({
                message: 'Please enter all fields'
            });
        }

        userDao.findUserByEmail(email)
        .then((user) => {
            if (user) {
                reject({
                    message: 'User already exists with that email'
                })
            } else {
                const newUser = new User({
                    name,
                    email,
                    password
                });
        
                bcrypt.genSalt(10, (error, salt) => {
                    bcrypt.hash(newUser.password, salt, (error, hash) => {
                        if (error) throw error;
                        newUser.password = hash;
                        userDao.registerUser(newUser).then((user) => {
                            user = {
                                id: user.id,
                                name: user.name,
                                email: user.email
                            }

                            jwt.sign(
                                { id: user.id},
                                config.get('jwtSecret'),
                                {expiresIn: 3600},
                                (error, token) => {
                                    if (error) throw error;
                                    resolve({
                                        token,
                                        user
                                    })
                                })
                        });
                    })
                });
            }
        });
    });
}

module.exports = userService;