'use strict'
const mongoService = require('./mongo.service')
const ObjectId = require('mongodb').ObjectId;


function checkUser(user) {
    return mongoService.connectToDb()
        .then(dbConn => {
            const db = dbConn.collection('user');
            return db.findOne(
                { $and: [{ "nickname": user.nickname }, { "password": user.password }] }

            )
                .then(user => {
                    if (!user) throw err;
                    return user
                });
        })
}


function query() {
    return mongoService.connectToDb()
        .then(dbConn => {
            const userCollection = dbConn.collection('user');
            return userCollection.find().toArray();
        })
}

function getById(userId) {
    const id = new ObjectId(userId)
    return mongoService.connectToDb()
        .then(db => {
            return db.collection('user')
                .aggregate([
                    {
                        $match: { _id: id }
                    },
                    {
                        $lookup:
                        {
                            from: 'item',
                            localField: 'itemList',
                            foreignField: '_id',
                            as: 'listedItems'
                        }
                    }
                ]).toArray()
        })
}
function getByName(userName) {
    return mongoService.connectToDb()
        .then(db => {
            return db.collection('user').findOne({ nickname: userName }).then(res => res)
        })
}

function getUserWishlist(userId) {
    const id = new ObjectId(userId)
    return mongoService.connectToDb()
        .then(db => {
            return db.collection('user')
                .aggregate([
                    {
                        $match: { _id: id }
                    },
                    {
                        $lookup:
                        {
                            from: 'item',
                            localField: 'wishList',
                            foreignField: '_id',
                            as: 'wishlistItems'
                        }
                    }
                ]).toArray()
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
            return userCollection.insertOne(user);
        })
}
function update(user) {
    console.log('----------------------in of server-----------------', user)
    const userId = new ObjectId(user._id)
    delete user._id;

    user.wishList = user.wishList.map(id => {
        return new ObjectId(id)
    })

    user.itemList = user.itemList.map(id => {
        return new ObjectId(id)
    })
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
    checkUser,
    getUserWishlist,
    getByName,
}






