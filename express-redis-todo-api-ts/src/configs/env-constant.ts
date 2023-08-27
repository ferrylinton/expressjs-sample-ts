import dotenv from 'dotenv';

dotenv.config();

if (!process.env.REDIS_URL) {
    throw new Error('Invalid environment variable: "REDIS_URL"')
}


export const ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || '5001';

export const REDIS_URL = process.env.REDIS_URL;