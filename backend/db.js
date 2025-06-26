const mongoose = require ('mongoose')
const dotenv = require('dotenv')

dotenv.config()
const mongoUri = process.env.MONGO_URI

const connectToMongo = () => {
    mongoose.connect(mongoUri)
    .then((con) => console.log("mongodb connected at:", con.connection.host))
    .catch((e) => console.log("mongodb connextion error: ",e))
}

module.exports = connectToMongo;