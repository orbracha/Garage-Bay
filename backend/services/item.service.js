const mongoService = require('./mongo.service')
const ObjectId = require('mongodb').ObjectId;


function query() {
    return mongoService.connectToDb()
        .then(dbConn => {
            const itemCollection = dbConn.collection('item');
            
            return itemCollection.find().toArray();
        })
}
function getById(itemId) {
    itemId = new ObjectId(itemId)
    return mongoService.connectToDb()
        .then(dbConn => {
            const itemCollection = dbConn.collection('item');
            return itemCollection.findOne({ _id: itemId })
        })
}
function remove(itemId) {
    itemId = new ObjectId(itemId)
    return mongoService.connectToDb()
        .then(dbConn => {
            const itemCollection = dbConn.collection('item');
            return itemCollection.remove({ _id: itemId })
        })
}
function add(item) {
    return mongoService.connectToDb()
        .then(dbConn => {
            const itemCollection = dbConn.collection('item');
            return itemCollection.insert(item);
        })
}
function update(item) {
    itemId = new ObjectId(item._id)
    delete item._id;
    return mongoService.connectToDb()
        .then(dbConn => {
            const itemCollection = dbConn.collection('item');
            return itemCollection.updateOne({ "_id": itemId }, { $set: item }).then(() => item)
        })
}
function getCatagories() {
    return mongoService.connectToDb()
        .then(dbConn => {
            const itemCollection = dbConn.collection('item');
            return itemCollection.distinct("category");
        })
}
function filterItems(query){
    console.log('query in back service is: ', query);
    
}



module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    getCatagories,
    filterItems
}

