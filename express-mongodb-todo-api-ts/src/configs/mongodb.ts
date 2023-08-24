import { Document, MongoClient, MongoClientOptions } from 'mongodb';
import { MONGODB_AUTH_SOURCE, MONGODB_DATABASE, MONGODB_PASSWORD, MONGODB_URL, MONGODB_USERNAME } from './constant';

const mongoClientOptions: MongoClientOptions = {
    authMechanism: "DEFAULT",
    authSource: MONGODB_AUTH_SOURCE,
    auth: {
        username: MONGODB_USERNAME,
        password: MONGODB_PASSWORD
    }
};

export const transactionOptions = {
    readConcern: { level: 'snapshot' },
    writeConcern: { w: 'majority' },
    readPreference: 'primary'
  };

const mongoClient = MongoClient.connect(MONGODB_URL, mongoClientOptions);

export const getDb = async () => {
    const connection = await mongoClient;
    return connection.db(MONGODB_DATABASE);
}

export const getCollection = async <TSchema extends Document = Document>(name: string) => {
    const db = await getDb();
    return db.collection<TSchema>(name);
}