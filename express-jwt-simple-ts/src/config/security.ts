import { expressjwt, Request as JWTRequest } from "express-jwt";
import * as authService from '../services/auth-service';
import { JWT_SECRET } from "./constant";

function getToken(req: JWTRequest) {
    if (req.headers.authorization && req.headers.authorization.split(" ")[0] === "Bearer") {
        return req.headers.authorization.split(" ")[1] as string;
    } else if (req.query && req.query.token) {
        return req.query.token as string;
    }

    return '';
}

export function securityConfig() {
    return expressjwt({
        secret: JWT_SECRET,
        algorithms: ["HS256"],
        credentialsRequired: true,
        getToken,
        isRevoked: authService.isRevoked
    }).unless({
        path: [
            '/authenticate'
        ]
    });
}