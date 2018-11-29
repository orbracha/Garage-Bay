const mongoService = require('./mongo.service')
const ObjectId = require('mongodb').ObjectId;


function query() {
    return mongoService.connectToDb()
        .then(dbConn => {
            const roomCollection = dbConn.collection('room');
            return roomCollection.find().toArray();
        })
}
function getById(roomId) {
    roomId = new ObjectId(roomId)
    return mongoService.connectToDb()
        .then(dbConn => {
            const roomCollection = dbConn.collection('room');
            return roomCollection.findOne({ _id: roomId })
        })
}
function remove(roomId) {
    roomId = new ObjectId(roomId)
    return mongoService.connectToDb()
        .then(dbConn => {
            const roomCollection = dbConn.collection('room');
            return roomCollection.remove({ _id: roomId })
        })
}

function update(room) {
    roomId = new ObjectId(room._id)
    delete room._id;
    return mongoService.connectToDb()
        .then(dbConn => {
            const roomCollection = dbConn.collection('room');
            return roomCollection.updateOne({ "_id": roomId }, { $set: room }).then(() => room)
        })
}
function addRoom(userId, userDest) {
    return mongoService.connectToDb()
        .then(dbConn => {
            const roomCollection = dbConn.collection('room');
            return roomCollection.insertOne({ "userId": userId ,"userDest": userDest }).then((room) => room)
        })
}
function findRoom(userId, userDest) {
    // userId = new ObjectId(userId);
    // userDest = new ObjectId(userDest);
    return mongoService.connectToDb()
        .then(dbConn => {
            const roomCollection = dbConn.collection('room');
            return roomCollection.findOne({ "userId": userId }, { "userDest": userDest }).then((room) => room)
        })
}



module.exports = {
    query,
    getById,
    remove,
    addRoom,
    update,
    findRoom
}

