import bcrypt from 'bcrypt';
import sha256 from 'crypto-js/sha256';
import { Request } from "express";
import requestIp from 'request-ip';
import parser from 'ua-parser-js';
import { REDIS_TOKEN_KEY } from "../configs/env-constant";
import { AuthenticateType } from '../validations/authenticate-schema';
import * as redisService from './redis-service';
import * as userService from './user-service';
import { uid } from 'uid';


export const authenticate = async ({ username, password }: AuthenticateType) => {
    const user = await userService.findByUsername(username);

    if (user && bcrypt.compareSync(password, user.password)) {
        return user;
    }

    return null;
}


export const generateToken = async ({ username, authorities }: User, client: ClientData) => {
    const token = uid(32);
    const clientData = { username, authorities, ...client };
    await redisService.saveToken(username, token, JSON.stringify(clientData));
    return { token, ...clientData };
}

export const getTokenFromRequest = (req: Request) => {
    if (req.header('x-access-token')) {
        return req.header('x-access-token') as string;
    } else if (req.query && req.query.token) {
        return req.query.token as string;
    }

    return null;
}

export const getClientInfo = (req: Request) => {
    const { browser, os } = parser(req.headers['user-agent']);
    const clientInfo = {
        browser: browser?.name,
        os: os?.name
    }

    return JSON.stringify(clientInfo);
}