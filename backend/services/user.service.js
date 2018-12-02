const mongoService = require('./mongo.service')
const ObjectId = require('mongodb').ObjectId;


function checkUser(user) {
    // return mongoService.connectToDb()
    //     .then(dbConn => {
    //         const toyCollection = dbConn.collection('user');
    //         return toyCollection.findOne(
    //             { $and: [{ "nickname": user.nickname }, { "password": user.password }] }

    //             )
    //             .then(user => {
    //             if (!user) throw err;
    //             return user
    //         });
    //     })
    return mongoService.connectToDb()
        .then(db => {
            return db.collection('user').aggregate([
                {
                    $match: { $and: [{ "nickname": user.nickname }, { "password": user.password }] }
                },
                {
                    $lookup:
                    {
                        from: 'item',
                        localField: 'itemList',
                        foreignField: '_id',
                        as: 'itemList'
                    },
                },
                {
                    $lookup:
                    {
                        from: 'item',
                        localField: 'wishList',
                        foreignField: '_id',
                        as: 'wishList'
                    },
                }
            ]).toArray()
            .then(user=>{
                console.log('user in back service:', user[0]);
                
return user[0]
            })
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
    var userId = new ObjectId(userId)
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
    userId = new ObjectId(user._id)
    delete user._id;
    return mongoService.connectToDb()
        .then(dbConn => {
            const userCollection = dbConn.collection('user');
            return userCollection.updateOne({ "_id": userId }, { $set: user }).then(() => user)
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






