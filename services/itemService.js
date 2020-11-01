const itemsDao = require('../dao/itemDao');
const itemModel = require('../models/item');

const itemService = {
    addItem,
    deleteItem,
    getAllItems
}

function addItem(item) {
    return new Promise((resolve, reject) => {
        const itemData = new itemModel({
            name: item.name
        })
        itemsDao.addItem(itemData)
            .then((item) => {
                resolve(item)
            }).catch((error) => {
                reject(error)
            });
    })
}

function getAllItems() {
    return new Promise((resolve, reject) => {
        itemsDao.getAllItems()
            .then((items) => {
                resolve(items);
            })
            .catch((error) => {
                reject(error);
            });
    });
}

function deleteItem(itemId) {
    return new Promise((resolve, reject) => {
        itemsDao.getItem(itemId)
            .then((item) => {
                if (item) {
                    itemsDao.deleteItem(item)
                        .then((resolve) => {
                            resolve({ success: true });
                        })
                        .catch((error) => {
                            reject(error);
                        });
                }  else {
                    reject({ success: false, message: 'No item found'})
                } 
                resolve({ success: true });
            })
            .catch((error) => {

            })
    })
}

function getItem(itemId) {
    return new Promise((resolve, reject) => {
        itemsDao.getItem(itemId)
            .then((item) => {
                resolve(item);
            })
            .catch((error) => {
                reject(error);
            })
    })
}

module.exports = itemService;