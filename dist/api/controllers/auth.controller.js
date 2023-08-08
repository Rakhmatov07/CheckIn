"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogin = exports.getRegister = exports.login = exports.register = void 0;
const user_validation_1 = require("../../utilities/user.validation");
const customError_1 = require("../../utilities/customError");
const auth_model_1 = __importDefault(require("../../models/auth.model"));
const jwt_1 = require("../../utilities/jwt");
const qrcode_1 = __importDefault(require("qrcode"));
const register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, lastname, phoneNumber } = req.body;
        const isValid = (0, user_validation_1.userValidation)({ firstname, lastname, phoneNumber });
        if (isValid)
            throw new customError_1.CustomError('Bad Request', 400);
        const findUser = yield auth_model_1.default.findOne({ phoneNumber });
        if (findUser)
            throw new customError_1.CustomError('User already registered', 409);
        const newUser = yield auth_model_1.default.create({ firstname, lastname, phoneNumber });
        const token = (0, jwt_1.signPayload)({ payload: newUser._id });
        qrcode_1.default.toDataURL(token, (err, src) => {
            if (err)
                throw new customError_1.CustomError("Something went wrong!!", 500);
            res.render("getQRCode", {
                qr_code: src,
            });
        });
    }
    catch (error) {
        next(error);
    }
});
exports.register = register;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { firstname, phoneNumber } = req.body;
        const findUser = yield auth_model_1.default.findOne({ firstname, phoneNumber });
        if (!findUser)
            throw new customError_1.CustomError('User Not Found', 404);
        const token = (0, jwt_1.signPayload)({ payload: findUser._id });
        qrcode_1.default.toDataURL(token, (err, src) => {
            if (err)
                throw new customError_1.CustomError("Something went wrong!!", 500);
            res.render("getQRCode", {
                qr_code: src,
            });
        });
    }
    catch (error) {
        next(error);
    }
});
exports.login = login;
const getRegister = (_, res, next) => {
    try {
        res.render('registration');
    }
    catch (error) {
        next(error);
    }
};
exports.getRegister = getRegister;
const getLogin = (_, res, next) => {
    try {
        res.render('login');
    }
    catch (error) {
        next(error);
    }
};
exports.getLogin = getLogin;
