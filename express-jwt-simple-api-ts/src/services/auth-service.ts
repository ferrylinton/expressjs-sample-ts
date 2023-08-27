
import { Request as JWTRequest } from "express-jwt";
import jsonwebtoken, { Jwt, JwtPayload, SignOptions } from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { JWT_EXPIRES_IN, JWT_SECRET } from '../config/constant';

const payloads: JwtPayload[] = [];

const signOptions: SignOptions = {
    expiresIn: JWT_EXPIRES_IN,
    algorithm: 'HS256'
}

const secretOrPrivateKey = JWT_SECRET

export async function authenticate(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {

        const payload = {
            sub: 'admin',
            jti: nanoid()
        }

        const token = jsonwebtoken.sign(payload, secretOrPrivateKey, signOptions);

        return {
            token
        };
    } else {
        return null;
    }
}

export async function revoke(payload: JwtPayload) {
    payloads.push(payload);
}

export async function isRevoked(_req: JWTRequest, token: Jwt | undefined) {
    if (token && token.payload) {
        const payload = token.payload as JwtPayload;
        const index = payloads.findIndex(p => p.aud === payload.aud && p.jti === payload.jti);
        return index !== -1;
    } else {
        return false
    }
}