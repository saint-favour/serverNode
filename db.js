/*NPM installed Mongodb & connecting to
the mongodb compass of my local storage*/ 

const {MongoClient} = require('mongodb')

let dbconnection

module.exports = {
    connectToDb: (cb) => {
        MongoClient.connect('')
            .then((client) => {
                dbconnection = client.db()
                return cb()
            })
            .catch((err)=> {
                console.log(err)
                return cb(err)
            })
    },
    getDb: () => dbconnection
}