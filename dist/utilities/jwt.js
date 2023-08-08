"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPayload = exports.signPayload = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_key = process.env.JWT_Key;
const signPayload = (payload) => jsonwebtoken_1.default.sign(payload, jwt_key);
exports.signPayload = signPayload;
const verifyPayload = (payload) => jsonwebtoken_1.default.verify(payload, jwt_key);
exports.verifyPayload = verifyPayload;
