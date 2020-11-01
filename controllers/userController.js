const UserService = require('../services/userService');

const userController = {
    registerUser
}

function registerUser(req, res, next) {
    UserService.registerUser(req.body)
    .then((user) => {
        res.statusCode = 200;
        res.send(user);
    })
    .catch((error) => {
        console.log(error);
        if (error.message == 'Please enter all fields' || error.message == 'User already exists with that email') {
            res.statusCode = 400;
            res.send({
                message: error.message
            })
        } 
    })
}

module.exports = userController;