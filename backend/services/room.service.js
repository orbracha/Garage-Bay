const mongoService = require('./mongo.service')
const ObjectId = require('mongodb').ObjectId;


function query(userId) {
    return mongoService.connectToDb()
        .then(dbConn => {
            const roomCollection = dbConn.collection('room');
            return roomCollection.find({ $or: [{ "userId": userId }, { "userDest": userId }] }).toArray();
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

function addMsgToRoom(msg, room) {
    roomId = new ObjectId(room._id)
    return mongoService.connectToDb()
        .then(dbConn => {
            const collection = dbConn.collection('room');
            return collection.update(
                { "_id": roomId },
                { $push: { "historyMsgs": msg } }
            )
        })
}
function addRoom(userId, userDest) {
    return mongoService.connectToDb()
        .then(dbConn => {
            const roomCollection = dbConn.collection('room');
            return roomCollection.insertOne({ "userId": userId, "userDest": userDest, "historyMsgs": [] }).then((room) => room)
        })
}
function findRoom(userId, userDest) {
    // userId = new ObjectId(userId);
    // userDest = new ObjectId(userDest);
    return mongoService.connectToDb()
        .then(dbConn => {
            const roomCollection = dbConn.collection('room');
            return roomCollection.findOne({ $or: [{ "userId": userId, "userDest": userDest }, { "userId": userDest, "userDest": userId }] }).then((room) => room)
        })
}



module.exports = {
    query,
    getById,
    remove,
    addRoom,
    addMsgToRoom,
    findRoom
}

