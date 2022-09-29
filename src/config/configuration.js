require('dotenv').config()
module.exports = {
    "hostname": process.env.HOST,
    "port": process.env.PORT,
    "database":{
        "uri":process.env.DB_URI,
        "user": process.env.DB_USER,
        "pass": process.env.DB_PASS,
        "hostname": process.env.DB_HOSTNAME,
        "dbName": process.env.DB_NAME
        
    }
}