import Jwt from 'jsonwebtoken';
const jwt_key = process.env.JWT_Key;

export const signPayload = (payload) => Jwt.sign(payload, jwt_key);
export const verifyPayload = (payload) => Jwt.verify(payload, jwt_key);
