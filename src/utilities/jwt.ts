import Jwt from 'jsonwebtoken';
const jwt_key: any = process.env.JWT_Key;

export const signPayload = (payload: any) => Jwt.sign(payload, jwt_key);
export const verifyPayload = (payload: any) => Jwt.verify(payload, jwt_key);
