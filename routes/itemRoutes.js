const express = require('express');
const ItemController = require('../controllers/itemController');
const auth = require('../middleware/auth');


const route = express.Router();

route.use(express.json());
route.get('/items', ItemController.getAllItems);
route.post('/item', auth, ItemController.addItem);
route.delete('/item/:id', auth, ItemController.deleteItem);

module.exports = route;