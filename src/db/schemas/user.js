const { Schema } = require("mongoose");

const UserSchema = new Schema({
    name:String,
    email: String,
    phone: String,
    notes: String
})

module.exports = UserSchema;