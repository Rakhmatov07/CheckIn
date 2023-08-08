import { CustomError } from "../../utilities/customError";
import User from  '../../models/auth.model';
import CheckIn from '../../models/checkIn.model';
import { verifyPayload } from "../../utilities/jwt";
import { NextFunction, Request, RequestHandler, Response } from "express";

export const entranceCheck: RequestHandler = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.body.qrCodeMessage as String;
        if(!token) throw new CustomError('Invalid Token', 403);

        const { payload } = verifyPayload(token) as { payload: String};
        const user = await User.findById(payload);

        if(!user) throw new CustomError('User Not Found', 404);
        await CheckIn.create({ userId: payload, entranceTime: new Date()});

        res.status(200).json({message: 'success'});
    } catch (error) {
        next(error);
    }
};

export const exitCheck: RequestHandler = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const token = req.body.qrCodeMessage as String;
        if(!token) throw new CustomError('Invalid Token', 403);

        const { payload } = verifyPayload(token) as { payload: String };
        const user = await User.findById(payload);

        if(!user) throw new CustomError('User Not Found', 404);
        const userLastCheckIn = (await CheckIn.find({ userId: payload })).reverse()[0];
        await CheckIn.findByIdAndUpdate({ _id: userLastCheckIn._id }, { exitTime: new Date() });

        res.status(200).json({ message: 'success' });
    } catch (error) {
        next(error);
    }
};

export const entrancePage: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.render('checkQREntrance');
    } catch (error) {
        next(error)
    }
};

export const exitPage: RequestHandler = (req: Request, res: Response, next: NextFunction): void => {
    try {
        res.render('checkQRExit');
    } catch (error) {
        next(error)
    }
};
