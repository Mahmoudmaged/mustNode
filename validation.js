const joi = require("joi")
const signup = {
    body: joi.object().required().keys({
        userName: joi.string().required(),
        email: joi.string().email(),
        age:joi.number(),
        password: joi.string().pattern(new RegExp(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)).required(),
        confirmPassword: joi.string().valid(joi.ref("password")).required()
    })
}
const updateUser  = {
    body :  joi.object().required().keys({
        name: joi.string().required()
    }),
    params : joi.object().required().keys({
        id:joi.string().required()
    })
}
module.exports ={
    signup,
    updateUser


    
}