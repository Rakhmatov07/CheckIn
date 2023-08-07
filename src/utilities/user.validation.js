import Joi from 'joi';

export const userValidation = (user) => {
    const User = Joi.object({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        phoneNumber: Joi.string().regex(/^\+\d{12}$/).required()
    });

    const { error } = User.validate(user);

    return error ? error.message : false;
};