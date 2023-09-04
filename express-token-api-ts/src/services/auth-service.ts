import { Request } from "express";
import { v4 as uuidv4 } from 'uuid';
import { JWT_EXPIRES_IN, JWT_SECRET } from "../configs/env-constant";
import jwt, { SignOptions } from 'jsonwebtoken';


const signOptions: SignOptions = {
    algorithm: 'HS256',
    expiresIn: JWT_EXPIRES_IN
}

export function getToken(req: Request) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1] as string;
    } else if (req.query && req.query.token) {
        return req.query.token as string;
    }

    return null;
}

export function generateToken(username: string) {
    const sub = username;
    const jti = uuidv4();
    return jwt.sign({ sub, jti }, JWT_SECRET, signOptions);
}

export function verifyToken(token: string){
    return jwt.verify(token, JWT_SECRET);
}