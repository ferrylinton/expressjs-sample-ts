import dotenv from 'dotenv';
dotenv.config();

if (!process.env.JWT_SECRET) {
  throw new Error('Invalid environment variable: "JWT_SECRET"')
}

if (!process.env.JWT_EXPIRES_IN) {
  throw new Error('Invalid environment variable: "JWT_EXPIRES_IN"')
}

export const JWT_SECRET: string = process.env.JWT_SECRET as string;
export const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN as string;