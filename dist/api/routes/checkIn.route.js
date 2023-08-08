"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const errorHandler_1 = require("../middlewares/errorHandler");
const checkIn_1 = require("../controllers/checkIn");
exports.router = express_1.default.Router();
exports.router.get('/entrance', checkIn_1.entrancePage, errorHandler_1.errorHandler);
exports.router.get('/exit', checkIn_1.exitPage, errorHandler_1.errorHandler);
exports.router.post('/entrance', checkIn_1.entranceCheck, errorHandler_1.errorHandler);
exports.router.post('/exit', checkIn_1.exitCheck, errorHandler_1.errorHandler);
