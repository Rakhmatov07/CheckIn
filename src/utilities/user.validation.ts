import Joi from 'joi';
import { IUser } from '../types/user.type';

export const userValidation = (user: IUser): String | Boolean => {
    const User = Joi.object({
        firstname: Joi.string().min(3).required(),
        lastname: Joi.string().min(3).required(),
        phoneNumber: Joi.string().regex(/^\+\d{12}$/).required()
    });

    const { error } = User.validate(user);

    return error ? error.message : false;
};