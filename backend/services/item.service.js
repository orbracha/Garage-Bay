const mongoService = require('./mongo.service')
const ObjectId = require('mongodb').ObjectId;


function query(criteria = {}) {
    return mongoService.connectToDb()
        .then(db => {
            return db.collection('item')
                .aggregate([
                    {
                        $match: criteria
                    },
                    {
                        $lookup:
                        {
                            from: 'user',
                            localField: 'sellerId',
                            foreignField: '_id',
                            as: 'user'
                        }
                    },
                    {
                        $unwind: '$user'
                    }
                ]).toArray()
                .then(items => {
                    console.log(items)
                    return items
                })
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
    item.sellerId = new ObjectId(item.sellerId)
    return mongoService.connectToDb()
        .then(dbConn => {
            const itemCollection = dbConn.collection('item');
            return itemCollection.insert(item);
        })
}
function update(item) {
    itemId = new ObjectId(item._id)
    item.sellerId = new ObjectId(item.sellerId)
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
function filterItems(queryObj){
    const criteria = {
        $and: []
    }
    if(queryObj.type) criteria.$and.push({ category: queryObj.type })
    if (queryObj.text) criteria.$and.push({ title: { $regex: queryObj.text,  $options: 'i' } })
   return query(criteria)    
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

