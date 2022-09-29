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
// async function createRecoveryCode(playerId){
//     return await new db.email_code({ playerId: playerId }).save();
// }

module.exports = {
    getUser,
    // createRecoveryCode,
    registerUser
}