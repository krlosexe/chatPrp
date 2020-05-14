const MongoClient = require('mongodb').MongoClient;


function ConnecMongo() {
    
    const uri = "mongodb://krlsoexe:ad17urca@31.220.60.218/:27017/chat";

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





