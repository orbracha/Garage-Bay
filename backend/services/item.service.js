const mongoService = require('./mongo.service')
const ObjectId = require('mongodb').ObjectId;
var cloudinary = require('cloudinary')
cloudinary.config({
    cloud_name: 'dwms8epem',
    api_key: '631124472585116',
    api_secret: 'eswbF3nMwMwU2Q-MBFUxBVRzgbY'
});

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
            return itemCollection.insertOne(item)
                .then(result => {
                    item.id = result.insertedId
                    const userCollection = dbConn.collection('user')
                    return userCollection.updateOne({ _id: item.sellerId }, { $push: { itemList: item.id } })
                        .then(() => item)
                })
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
function filterItems(queryObj) {
    const criteria = {
        $and: []
    }
    if (queryObj.type) criteria.$and.push({ category: queryObj.type })
    if (queryObj.text) criteria.$and.push({ title: { $regex: queryObj.text, $options: 'i' } })
    return query(criteria)
}
function saveImgToCloudinary({ imageToSave }) {
    return cloudinary.v2.uploader.upload(imageToSave)
        .then(data => data.secure_url)
}







module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    getCatagories,
    filterItems,
    saveImgToCloudinary
}

