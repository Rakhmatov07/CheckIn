import { userValidation } from "../../utilities/user.validation";
import { CustomError } from "../../utilities/customError";
import User from "../../models/auth.model";
import { signPayload } from '../../utilities/jwt';
import qrcode from "qrcode";
import { NextFunction, Request, RequestHandler, Response } from "express";
import { IUser } from "../../types/user.type";
import { ILogin } from "../../types/login.type";


export const register: RequestHandler = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { firstname, lastname, phoneNumber } = req.body as IUser;
        const isValid = userValidation({ firstname, lastname, phoneNumber }) as String | Boolean;

        if(isValid) throw new CustomError('Bad Request', 400);

        const findUser = await User.findOne({ phoneNumber });
        if(findUser) throw new CustomError('User already registered', 409);

        const newUser = await User.create({ firstname, lastname, phoneNumber });
        const token = signPayload({payload: newUser._id});

        qrcode.toDataURL(token, (err, src) => {
            if (err) throw new CustomError("Something went wrong!!", 500);

            res.render("getQRCode", {
              qr_code: src,
            });
        });
    } catch (error) {
        next(error);
    }
};

export const login: RequestHandler = async(req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
        const { firstname, phoneNumber } = req.body as unknown as ILogin;

        const findUser = await User.findOne({ firstname, phoneNumber });
        if(!findUser) throw new CustomError('User Not Found', 404);

        const token = signPayload({ payload: findUser._id });

        qrcode.toDataURL(token, (err, src) => {
            if (err) throw new CustomError("Something went wrong!!", 500);
            
            res.render("getQRCode", {
              qr_code: src,
            });
        });
    } catch (error) {
        next(error);
    }
};

export const getRegister: RequestHandler = (_: Request, res: Response, next: NextFunction): void => {
    try {
        res.render('registration');
    } catch (error) {
        next(error);
    }
};

export const getLogin: RequestHandler = (_: Request, res: Response, next: NextFunction): void => {
    try {
        res.render('login');
    } catch (error) {
        next(error);
    }
};
