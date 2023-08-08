"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const errorHandler_1 = require("../middlewares/errorHandler");
exports.router = express_1.default.Router();
exports.router.get('/auth/register', auth_controller_1.getRegister, errorHandler_1.errorHandler);
exports.router.get('/auth/login', auth_controller_1.getLogin, errorHandler_1.errorHandler);
exports.router.post('/auth/register', auth_controller_1.register, errorHandler_1.errorHandler);
exports.router.post('/auth/login', auth_controller_1.login, errorHandler_1.errorHandler);
