import dotenv from 'dotenv';
import mongoose from 'mongoose';
import util from 'util';
import { logger } from './winston';

dotenv.config();

const { MONGODB_URI } = process.env;
const env = process.env.NODE_ENV || 'development';

if (!MONGODB_URI) throw new Error('MONGODB_URI not defined');

const options = {
    autoIndex: true, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

if (env === 'development') {
    mongoose.set('debug', (collectionName: string, methodName: string, ...methodArgs: any[]) => {
        const args = methodArgs.map(arg => util.format(arg));
        logger.debug(`${collectionName}.${methodName}(${args})`)
    });
}

export default mongoose.connect(`${MONGODB_URI}`, options);