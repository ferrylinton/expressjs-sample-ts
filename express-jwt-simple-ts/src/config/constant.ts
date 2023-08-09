import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
    throw new Error('Invalid environment variable: "JWT_SECRET"')
  }

export const JWT_SECRET : string = process.env.JWT_SECRET as string