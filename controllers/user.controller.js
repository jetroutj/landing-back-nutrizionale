const db = require("../src/db");

async function registerUser(name, lastname, email, phone,notes) {

    const user = await new db.user({
        name: name,
        lastname: lastname,
        email: email,
        phone: phone,
        notes:notes
    }).save();

    return user
}
async function getUser(email){
    return await db.user.findOne({email: email});
}

module.exports = {
    getUser,
    registerUser
}