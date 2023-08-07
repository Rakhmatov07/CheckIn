import express from "express";
import { getLogin, getRegister, login, register } from "../controllers/auth.controller.js";
import { errorHandler } from "../middlewares/errorHandler.js";
export const router = express.Router();


router.get('/auth/register', getRegister, errorHandler);
router.get('/auth/login', getLogin, errorHandler);
router.post('/auth/register', register, errorHandler);
router.post('/auth/login', login, errorHandler);
