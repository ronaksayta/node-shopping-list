const User = require('../models/user');

const UserDao = {
    registerUser,
    findUserByEmail,
    findUserById
}

function registerUser(user) {
    return user.save();
}

function findUserByEmail(email) {
    return User.findOne({email});
}

function findUserById(id) {
    return User.findById(id).select('-password');
}

module.exports = UserDao;