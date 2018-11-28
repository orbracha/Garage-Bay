const mongoService = require('./mongo.service')
const ObjectId = require('mongodb').ObjectId;


function query() {
    return mongoService.connectToDb()
        .then(dbConn => {
            const msgCollection = dbConn.collection('msg');
            return msgCollection.find().toArray();
        })
}
function getById(msgId) {
    msgId = new ObjectId(msgId)
    return mongoService.connectToDb()
        .then(dbConn => {
            const msgCollection = dbConn.collection('msg');
            return msgCollection.findOne({ _id: msgId })
        })
}
function remove(msgId) {
    msgId = new ObjectId(msgId)
    return mongoService.connectToDb()
        .then(dbConn => {
            const msgCollection = dbConn.collection('msg');
            return msgCollection.remove({ _id: msgId })
        })
}
function add(msg) {
    return mongoService.connectToDb()
        .then(dbConn => {
            const msgCollection = dbConn.collection('msg');
            return msgCollection.insert(msg);
        })
}
function update(msg) {
    msgId = new ObjectId(msg._id)
    delete msg._id;
    return mongoService.connectToDb()
        .then(dbConn => {
            const msgCollection = dbConn.collection('msg');
            return msgCollection.updateOne({ "_id": msgId }, { $set: msg }).then(() => msg)
        })
}



module.exports = {
    query,
    getById,
    remove,
    add,
    update
}

