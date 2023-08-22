import { MongoClient, MongoClientOptions } from 'mongodb';
import { MONGODB_AUTH_SOURCE, MONGODB_PASSWORD, MONGODB_URL, MONGODB_USERNAME } from './constant';

const mongoClientOptions: MongoClientOptions = {
    authMechanism: "DEFAULT",
    authSource: MONGODB_AUTH_SOURCE,
    auth: {
        username: MONGODB_USERNAME,
        password: MONGODB_PASSWORD
    }
};

export const mongoClient = MongoClient.connect(MONGODB_URL, mongoClientOptions);