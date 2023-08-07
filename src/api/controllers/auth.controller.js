import { userValidation } from "../../utilities/user.validation.js";
import { CustomError } from "../../utilities/customError.js";
import User from "../../models/auth.model.js";
import { signPayload } from '../../utilities/jwt.js';
import qrcode from "qrcode";

export const register = async(req, res, next) => {
    try {
        const { firstname, lastname, phoneNumber } = req.body;
        const isValid = userValidation({ firstname, lastname, phoneNumber });

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

export const login = async(req, res, next) => {
    try {
        const { firstname, phoneNumber } = req.body;

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


export const getRegister = (_, res, next) => {
    try {
        res.render('registration');
    } catch (error) {
        next(error);
    }
};

export const getLogin = (_, res, next) => {
    try {
        res.render('login');
    } catch (error) {
        next(error);
    }
};
