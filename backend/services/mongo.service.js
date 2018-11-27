
const MongoClient = require('mongodb').MongoClient;


const url = 'mongodb://garage-bay:garage123@ds119768.mlab.com:19768/garage-bay';

const dbName = 'garage-bay';

var dbConnection = null;

function connectToDb() {
    if (dbConnection) return Promise.resolve(dbConnection);
    return new Promise((resolve, reject)=>{
        MongoClient.connect(url, (err, client) => {
            if (err) return reject('Cannot connect to Mongo');
            console.log("Connected successfully to server");
            dbConnection = client.db(dbName);
            resolve(dbConnection)
        });

    });
}


module.exports = {
    connectToDb
}