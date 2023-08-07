import { CustomError } from "../../utilities/customError.js";
import User from  '../../models/auth.model.js';
import CheckIn from '../../models/checkIn.model.js';
import { verifyPayload } from "../../utilities/jwt.js";

export const entranceCheck = async(req, res, next) => {
    try {
        const token = req.body.qrCodeMessage;
        if(!token) throw new CustomError('Invalid Token', 403);

        const { payload } = verifyPayload(token);
        const user = await User.findById(payload);

        if(!user) throw new CustomError('User Not Found', 404);
        await CheckIn.create({ userId: payload, entranceTime: new Date()});

        res.status(200).json({message: 'success'});
    } catch (error) {
        next(error);
    }
};

export const exitCheck = async(req, res, next) => {
    try {
        const token = req.body.qrCodeMessage;
        if(!token) throw new CustomError('Invalid Token', 403);

        const { payload } = verifyPayload(token);
        const user = await User.findById(payload);

        if(!user) throw new CustomError('User Not Found', 404);
        const userLastCheckIn = (await CheckIn.find({ userId: payload })).reverse()[0];
        await CheckIn.findByIdAndUpdate({ _id: userLastCheckIn._id }, { exitTime: new Date() });

        res.status(200).json({ message: 'success' });
    } catch (error) {
        next(error);
    }
};

export const entrancePage = (req, res, next) => {
    try {
        res.render('checkQREntrance');
    } catch (error) {
        next(error)
    }
};

export const exitPage = (req, res, next) => {
    try {
        res.render('checkQRExit');
    } catch (error) {
        next(error)
    }
};
