require("dotenv").config();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const { database } = require("../config/configuration")

class Mongo{
    rootSchemasDir = __dirname + "/schemas/";
    connection;
    urlMongo;

    constructor(){
        if(database.uri){
            this.urlMongo = database.uri
        }else{
            this.urlMongo = `mongodb://${database.hostname}/${database.dbName}`;
        }
       
    }

    async initialize(){
        await this.connect();
        this.createModels();
        return;
    }

    async connect(){
        this.connection = mongoose.connection;
        this.connection.on('open', () => console.log("Connected to mongoDB at: " + this.urlMongo));
        this.connection.on('error', ()=>console.error("Error connecting to mongo at: "+this.urlMongo));
       await mongoose.connect(this.urlMongo,
            {
                // useFindAndModify:false,
                useUnifiedTopology: true,
                useNewUrlParser: true,
                user: database.user || '',
                pass: database.pass || ''
            }
        );
        
        return;
    }

    createModels(){
        fs.readdirSync(this.rootSchemasDir).forEach(filename => {
            let name = (path.basename(filename).replace(path.extname(filename), ''));
            let schema = require(this.rootSchemasDir + filename);
            let model = mongoose.model(name, schema);
            this[model.modelName] = model;
        });
    }
}

module.exports = new  Mongo();