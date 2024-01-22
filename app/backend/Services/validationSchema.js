const Joi = require("joi");

const registerValidation = Joi.object({
role: Joi.string(),
name: Joi.string().required(),
email: Joi.string().email().required(),
password: Joi.string().required().min(3).max(50),
// originalPassword:Joi.string().required().min(3).max(50),
// confirmPassword: Joi.string().required().min(3).max(50),
// address:Joi.string(),
lastLoginAt:Joi.date(),
purchaseDate:Joi.date(),
expiryDate:Joi.date(),
lastLoginIp:Joi.string(),
activationCode:Joi.number()
});


const loginValidation = Joi.object({
    email:Joi.string().required(),
    password:Joi.string().min(2).required(),
})

module.exports = {
    registerValidation,
    loginValidation
};