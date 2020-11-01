const express = require('express');
const UserController = require('../controllers/userController');


const route = express.Router();

route.use(express.json());
route.post('/users', UserController.registerUser);

module.exports = route;