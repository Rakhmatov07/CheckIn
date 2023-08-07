import express from 'express';
import { errorHandler } from '../middlewares/errorHandler.js';
import { entranceCheck, entrancePage, exitCheck, exitPage } from '../controllers/checkIn.js';
export const router = express.Router();

router.get('/entrance', entrancePage, errorHandler);
router.get('/exit', exitPage, errorHandler);
router.post('/entrance', entranceCheck, errorHandler);
router.post('/exit', exitCheck, errorHandler);
