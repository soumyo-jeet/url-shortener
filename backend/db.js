const mongoose = require ('mongoose')
const mongoUri = "mongodb+srv://samajdarsoumyajeet0:nbpDse54w13Zk0Ie@cluster0.r7zk3uj.mongodb.net/url-shortener?retryWrites=true&w=majority&appName=Cluster0"

const connectToMongo = () => {
    mongoose.connect(mongoUri)
    .then((con) => console.log("mongodb connected at:", con.connection.host))
    .catch((e) => console.log("mongodb connextion error: ",e))
}

module.exports = connectToMongo;