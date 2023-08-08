"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const joi_1 = __importDefault(require("joi"));
const userValidation = (user) => {
    const User = joi_1.default.object({
        firstname: joi_1.default.string().min(3).required(),
        lastname: joi_1.default.string().min(3).required(),
        phoneNumber: joi_1.default.string().regex(/^\+\d{12}$/).required()
    });
    const { error } = User.validate(user);
    return error ? error.message : false;
};
exports.userValidation = userValidation;
