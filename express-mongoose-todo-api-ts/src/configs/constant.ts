import dotenv from 'dotenv';
import { CookieOptions } from 'express';

dotenv.config();

export const ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || '5001';

if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI not defined');
if (!process.env.COOKIE_SECRET) throw new Error('COOKIE_SECRET not defined');

export const MONGODB_URI = process.env.MONGODB_URI;
export const COOKIE_SECRET = process.env.COOKIE_SECRET;

export const COOKIE_OPTIONS: CookieOptions = {
    maxAge: 1000 * 60 * 15, // would expire after 15 minutes
    httpOnly: true, // The cookie only accessible by the web server
    signed: true // Indicates if the cookie should be signed
} 

export const CORS_WHITELIST = (process.env.CORS_WHITELIST || '').split(',');
export const IP_WHITELIST = (process.env.IP_WHITELIST || '').split(',');

export const LOG_CONSOLE = process.env.LOG_CONSOLE || 'debug';
export const LOG_FILE = process.env.LOG_FILE || 'warn';
export const LOG_REQUEST = process.env.LOG_REQUEST || 'debug';
export const LOG_MONGOOSE = process.env.LOG_MONGOOSE || 'debug';