import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const { MONGODB_URI } = process.env;

if (!MONGODB_URI) throw new Error('MONGODB_URI not defined');

const options = {
    autoIndex: true, // Don't build indexes
    maxPoolSize: 10, // Maintain up to 10 socket connections
    serverSelectionTimeoutMS: 5000, // Keep trying to send operations for 5 seconds
    socketTimeoutMS: 45000, // Close sockets after 45 seconds of inactivity
    family: 4 // Use IPv4, skip trying IPv6
};

mongoose.set("debug", (collectionName, method, query, _doc) => {
    if(query){
        delete query['password'];
        delete query['passwordConfirm'];
    }
});

export default mongoose.connect(`${MONGODB_URI}`, options).then(mongoose => mongoose);