import express, { Router } from 'express';
import { errorHandler } from '../middlewares/errorHandler';
import { entranceCheck, entrancePage, exitCheck, exitPage } from '../controllers/checkIn';
export const router: Router  = express.Router();

router.get('/entrance', entrancePage, errorHandler);
router.get('/exit', exitPage, errorHandler);
router.post('/entrance', entranceCheck, errorHandler);
router.post('/exit', exitCheck, errorHandler);
