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
exports.exitPage = exports.entrancePage = exports.exitCheck = exports.entranceCheck = void 0;
const customError_1 = require("../../utilities/customError");
const auth_model_1 = __importDefault(require("../../models/auth.model"));
const checkIn_model_1 = __importDefault(require("../../models/checkIn.model"));
const jwt_1 = require("../../utilities/jwt");
const entranceCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.qrCodeMessage;
        if (!token)
            throw new customError_1.CustomError('Invalid Token', 403);
        const { payload } = (0, jwt_1.verifyPayload)(token);
        const user = yield auth_model_1.default.findById(payload);
        if (!user)
            throw new customError_1.CustomError('User Not Found', 404);
        yield checkIn_model_1.default.create({ userId: payload, entranceTime: new Date() });
        res.status(200).json({ message: 'success' });
    }
    catch (error) {
        next(error);
    }
});
exports.entranceCheck = entranceCheck;
const exitCheck = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.body.qrCodeMessage;
        if (!token)
            throw new customError_1.CustomError('Invalid Token', 403);
        const { payload } = (0, jwt_1.verifyPayload)(token);
        const user = yield auth_model_1.default.findById(payload);
        if (!user)
            throw new customError_1.CustomError('User Not Found', 404);
        const userLastCheckIn = (yield checkIn_model_1.default.find({ userId: payload })).reverse()[0];
        yield checkIn_model_1.default.findByIdAndUpdate({ _id: userLastCheckIn._id }, { exitTime: new Date() });
        res.status(200).json({ message: 'success' });
    }
    catch (error) {
        next(error);
    }
});
exports.exitCheck = exitCheck;
const entrancePage = (req, res, next) => {
    try {
        res.render('checkQREntrance');
    }
    catch (error) {
        next(error);
    }
};
exports.entrancePage = entrancePage;
const exitPage = (req, res, next) => {
    try {
        res.render('checkQRExit');
    }
    catch (error) {
        next(error);
    }
};
exports.exitPage = exitPage;
