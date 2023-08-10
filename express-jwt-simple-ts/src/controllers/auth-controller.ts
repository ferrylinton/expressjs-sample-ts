
import { Request, Response } from 'express';
import { Request as JWTRequest } from "express-jwt";
import * as authService from '../services/auth-service';
import { JwtPayload } from 'jsonwebtoken';

export async function authenticate(req: Request, res: Response) {
    const { username, password } = req.body;
    const token = await authService.authenticate(username, password);

    if (token) {
        res.status(200).json(token);
    } else {
        res.status(401).json({ message: 'Invalid username or password' });
    }

};

export async function me(req: JWTRequest, res: Response) {
    res.status(200).json(req.auth);
};

export async function revoke(req: JWTRequest, res: Response) {
    authService.revoke(req.auth as JwtPayload);
    res.status(200).json({ message: 'Token is revoked succesfully' });
};