'use strict';

const mongoService = require('./mongo.service')
const ObjectId = require('mongodb').ObjectId;


function checkUser(user) {
    return mongoService.connectToDb()
        .then(dbConn => {
            const db = dbConn.collection('or-user');
            return db.findOne(
                { $and: [{ "nickname": user.nickname }, { "password": user.password }] }

            )
                .then(user => {
                    if (!user) throw err;
                    return user
                });
        })
    // return mongoService.connectToDb()
    //     .then(db => {
    //         return db.collection('user').aggregate([
    //             {
    //                 $match: { $and: [{ "nickname": user.nickname }, { "password": user.password }] }
    //             },
    //             {
    //                 $lookup:
    //                 {
    //                     from: 'item',
    //                     localField: 'itemList',
    //                     foreignField: '_id',
    //                     as: 'itemList'
    //                 },
    //             },
    //             {
    //                 $lookup:
    //                 {
    //                     from: 'item',
    //                     localField: 'wishList',
    //                     foreignField: '_id',
    //                     as: 'wishList'
    //                 },
    //             }
    //         ]).toArray()
    //             .then(user => user[0])
    //     })
}



function query() {
    return mongoService.connectToDb()
        .then(dbConn => {
            const userCollection = dbConn.collection('or-user');
            return userCollection.find().toArray();
        })
}

function getById(userId) {
    userId = new ObjectId(userId)
    return mongoService.connectToDb()
        .then(dbConn => {
            const userCollection = dbConn.collection('user');
            return userCollection.findOne({ _id: userId })
        })
}

function remove(userId) {
    userId = new ObjectId(userId)
    return mongoService.connectToDb()
        .then(dbConn => {
            const userCollection = dbConn.collection('user');
            return userCollection.remove({ _id: userId })
        })
}
function add(user) {
    return mongoService.connectToDb()
        .then(dbConn => {
            const userCollection = dbConn.collection('user');
            return userCollection.insert(user);
        })
}
function update(user) {
    console.log('----------------------in of server-----------------', user)
    const userId = new ObjectId(user._id)
    delete user._id;
    return mongoService.connectToDb()
        .then(dbConn => {
            const userCollection = dbConn.collection('user');
            return userCollection.updateOne({ "_id": userId }, { $set: user }).then(() => {
                user._id = userId;
                console.log(userId)
                return user
            })
        })
}



module.exports = {
    query,
    getById,
    remove,
    add,
    update,
    checkUser
}






