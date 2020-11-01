const ItemService = require('../services/itemService');

const itemController = {
    addItem,
    deleteItem,
    getAllItems
}

function addItem(req, res, next) {
    ItemService.addItem(req.body)
    .then((item) => {
        res.statusCode = 200;
        res.send(item);
    })
    .catch((error) => {
        res.statusCode = 500;
        console.log(error);
        res.send(error);
    })
}

function getAllItems(req, res, next) {
    ItemService.getAllItems()
    .then((items) => {
        res.statusCode = 200;
        res.send(items);
    })
    .catch((error) => {
        res.statusCode = 500;
        console.log(error);
        res.send({
            error: 'Internal server error'
        });
    });
}

function deleteItem(req, res, next) {
    ItemService.deleteItem(req.params.id).then((itemDeleted) => {
        res.statusCode = 200;
        res.send({
            message: `Item deleted for id ${req.params.id}`
        })
    })
    .catch((error) => {
        if (!error.success) {
            res.statusCode = 404;
            res.send({
                message: `Item not found for id ${req.params.id}`
            })
        }
    });
}

module.exports = itemController;