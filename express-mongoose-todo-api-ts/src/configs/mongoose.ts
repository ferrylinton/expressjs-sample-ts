import mongoose from 'mongoose';
import util from 'util';
import { MONGODB_URI } from './constant';
import { logger } from './winston';


const options = {
    autoIndex: true, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.set('debug', (collectionName: string, methodName: string, ...methodArgs: any[]) => {
    try {
        const args = methodArgs.map(arg => util.format(arg));

        logger.log({
            mongoose: true,
            level: 'debug',
            message: `[MONGOOSE] ${collectionName}.${methodName}(${args})`
        });

    } catch (error) {
        console.error(error);
    }
});


export default mongoose.connect(`${MONGODB_URI}`, options);