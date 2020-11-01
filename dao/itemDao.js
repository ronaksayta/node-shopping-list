const Item = require('../models/item');

const ItemDao = {
    addItem,
    deleteItem,
    getAllItems,
    getItem
}

function addItem(item) {
    return item.save();
}

function getAllItems() {
    return Item.find().sort({date: -1});
}

function getItem(itemId) {
    return Item.findById(itemId);
}

function deleteItem(item) {
    return Item.deleteOne(item);
}

module.exports = ItemDao;