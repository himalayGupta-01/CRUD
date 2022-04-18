import Joi from "joi";
const addStudentSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    mobile: Joi.number().required(),
    fees: Joi.number().required()

})

const updateStudentSchema = Joi.object({
    id: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
    address: Joi.string().required(),
    mobile: Joi.number().required(),
    fees: Joi.number().required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()

})

const addUserSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(15).required()

})

const loginUserSchema = Joi.object({
    id: Joi.string(),
    email: Joi.string().email().required(),
    password: Joi.string().min(8).max(15).required(),
    createdAt: Joi.date(),
    updatedAt: Joi.date()

})

export { addStudentSchema, updateStudentSchema, addUserSchema, loginUserSchema };