import dotenv from 'dotenv';

dotenv.config();

if (!process.env.REDIS_URL && !process.env.REDIS_SOCKET_PATH) {
    throw new Error('Invalid environment variable: "REDIS_URL or REDIS_SOCKET_PATH"')
}

if (!process.env.MONGODB_URL) {
    throw new Error('Invalid environment variable: "MONGODB_URL"')
}

if (!process.env.MONGODB_AUTH_SOURCE) {
    throw new Error('Invalid environment variable: "MONGODB_AUTH_SOURCE"')
}

if (!process.env.MONGODB_USERNAME) {
    throw new Error('Invalid environment variable: "MONGODB_USERNAME"')
}

if (!process.env.MONGODB_PASSWORD) {
    throw new Error('Invalid environment variable: "MONGODB_PASSWORD"')
}

if (!process.env.MONGODB_DATABASE) {
    throw new Error('Invalid environment variable: "MONGODB_DATABASE"')
}

export const ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || '5001';
export const IP_WHITELIST = (process.env.IP_WHITELIST || '').split(',');

export const MONGODB_URL = process.env.MONGODB_URL;
export const MONGODB_AUTH_SOURCE = process.env.MONGODB_AUTH_SOURCE;
export const MONGODB_USERNAME = process.env.MONGODB_USERNAME;
export const MONGODB_PASSWORD = process.env.MONGODB_PASSWORD;
export const MONGODB_DATABASE = process.env.MONGODB_DATABASE;

export const REDIS_URL = process.env.REDIS_URL;
export const REDIS_SOCKET_PATH = process.env.REDIS_SOCKET_PATH;

export const JWT_SECRET = process.env.JWT_SECRET || 'jwtsecret123456';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '15m';