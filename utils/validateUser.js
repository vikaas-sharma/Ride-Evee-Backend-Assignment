const Joi = require('joi');

const userValidationSchema=Joi.object({
    name:Joi.string()
            .required(),
    email:Joi.string()
             .email({tlds:{allow:false}})
             .required(),
    phone:Joi.string()
             .pattern(/^[0-9]{10}$/) 
             .min(10)
             .max(15)
             .required(),
    password:Joi.string()
                .min(6)
                .required(),
    role:Joi.string()
            .valid('user','admin'),
});


//function for validate input user
const validateUser=(data)=>{
    return userValidationSchema.validate(data);
}
module.exports = validateUser;