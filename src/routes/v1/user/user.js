const Joi = require('joi')
const router = require('express').Router();
const { registerUser,getUser } = require('../../../../controllers/user.controller');




module.exports = (app) => {

app.get('/rest/v1/user', (req, res) => {
  res.send('hello world')
})

app.post('/rest/v1/user',async(req, res) => {

    try {
        const createUserSchema = Joi.object({
            email: Joi.string().email().trim().required(),
            name: Joi.string().required(),
            lastName: Joi.string().required(),
            phone: Joi.string().required(),
            notes:Joi.string()
        
          }).required()
        
        const validatedBody = await createUserSchema.validateAsync(req.body)
    
        const {name,lastName,email,phone,notes} = await validatedBody
        
        const findEmail = await getUser(email)
        if (findEmail) {
            return res.status(400).send({status:400,message:'Este email ya existe'})  
        }
        const user = await registerUser(name,lastName,email,phone,notes)
    
        return res.status(200).send({status:200,user:user,message:'OK'})
        
    } catch (error) {
        console.log(error);
        return res.status(400).send(error)
    }

})

app.use(router)

}