const Joi = require("joi");

const signUpSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phone: Joi.string().required(),
}).unknown();

const loginSchema = Joi.alternatives().try(
    Joi.object({
        email: Joi.string().email().required(),
        phone: Joi.forbidden(),
        password: Joi.string().required(),
    }).unknown(),
    Joi.object({
        email: Joi.forbidden(),
        phone: Joi.string().required(),
        password: Joi.string().required(),
    }).unknown()
);

const schema = { signUpSchema, loginSchema };

module.exports = schema;
