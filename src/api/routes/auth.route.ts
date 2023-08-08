import express, { Router } from "express";
import { getLogin, getRegister, login, register } from "../controllers/auth.controller";
import { errorHandler } from "../middlewares/errorHandler";
export const router: Router = express.Router();


router.get('/auth/register', getRegister, errorHandler);
router.get('/auth/login', getLogin, errorHandler);
router.post('/auth/register', register, errorHandler);
router.post('/auth/login', login, errorHandler);
