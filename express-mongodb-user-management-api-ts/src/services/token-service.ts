import sha256 from 'crypto-js/sha256';
import { Request } from "express";
import requestIp from 'request-ip';
import parser from 'ua-parser-js';
import { REDIS_TOKEN_KEY } from "../configs/env-constant";


export function getTokenFromRequest(req: Request) {
    if (req.header('x-access-token')) {
        return req.header('x-access-token') as string;
    } else if (req.query && req.query.token) {
        return req.query.token as string;
    }

    return null;
}

export function createTokenFromRequest(req: Request) {
    const username = req.body.username;
    const clientInfo = getClientInfo(req);
    const clientIp = requestIp.getClientIp(req);
    const createdAt = new Date().getTime();

    return createdAt + '-' + sha256(`${REDIS_TOKEN_KEY}${username}${clientIp}${clientInfo}${createdAt}`).toString();
}

export function isTokenValid(username: string, req: Request, token: string) {
    const arr = token.split('-');

    if (arr && arr.length === 2) {
        const clientInfo = getClientInfo(req);
        const clientIp = requestIp.getClientIp(req);
        const createdAt = arr[0];
        return token === createdAt + '-' + sha256(`${REDIS_TOKEN_KEY}${username}${clientIp}${clientInfo}${createdAt}`).toString();
    } else {
        return false;
    }
}

function getClientInfo(req: Request) {
    const { browser, os } = parser(req.headers['user-agent']);
    const clientInfo = {
        browser: browser?.name,
        os: os?.name
    }

    return JSON.stringify(clientInfo);
}