const MongoClient = require('mongodb').MongoClient;


function ConnecMongo() {
    
    const uri = "mongodb://krlsoexe:ad17urca@127.0.0.1/:27017/chat";

    let mongoOptions = {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    }

    mongo = new MongoClient(uri, mongoOptions);
    try {
        let db = mongo.connect()
        return mongo
    } catch (error) {
        console.log(error)
    }

}


module.exports = ConnecMongo;





