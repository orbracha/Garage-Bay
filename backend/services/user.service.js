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


function updateUserDibs(userId, dib) {
    const id = new ObjectId(userId)
    console.log('update user', userId)
    console.log('update user with dib', dib)
    return mongoService.connectToDb().then(db => {
        return db.collection('user').updateOne({ _id: id }, { $push: { dibs: dib } })
    })
}
function updateUserDibsAns(userId, ans) {
    const id = new ObjectId(userId)
    console.log('update user', id)
    console.log('update ans', ans.dib.item)
    return mongoService.connectToDb().then(db => {
        return db.collection('user').updateOne(
            {
                _id: id,
                dibsAns: {
                    $elemMatch: { 'item._id': ans.dib.item._id }
                }
            },
            { $set: { 'dibsAns.$.isAns': true, 'dibsAns.$.type': ans.type } }
        )
    })
}
function removeUserDib(dib) {
    const sellerId = new ObjectId(dib.item.sellerId)
    return mongoService.connectToDb()
        .then(dbConn => {
            const userCollection = dbConn.collection('user');
            return userCollection.updateOne({ _id: sellerId }, {
                $pull: {
                    dibs: {
                        $and: [{ from: dib.from }, { item: dib.item }]
                    }
                }
            }, { multi: true })
                .then(result => console.log({ nModified: result.result.nModified }))
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
    getByName,
    updateUserDibs,
    removeUserDib,
    updateUserDibsAns,
    getUserWishlist,
    getByName,

}






