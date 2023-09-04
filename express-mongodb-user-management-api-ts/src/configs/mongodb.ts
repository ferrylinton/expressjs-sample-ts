import { Db, Document, MongoClient, MongoClientOptions } from 'mongodb';
import { MONGODB_AUTH_SOURCE, MONGODB_DATABASE, MONGODB_PASSWORD, MONGODB_URL, MONGODB_USERNAME } from './env-constant';

const mongoClientOptions: MongoClientOptions = {
    authMechanism: "DEFAULT",
    authSource: MONGODB_AUTH_SOURCE,
    monitorCommands: true,
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

const instance = new MongoClient(MONGODB_URL, mongoClientOptions);
instance.on('connectionPoolCreated', (event) => console.debug(event));
instance.on('connectionPoolReady', (event) => console.debug(event));
instance.on('connectionCreated', (event) => console.debug(event));
instance.on('connectionClosed', (event) => console.debug(event));

export const mongoClient = instance.connect();

export const getDb = async () => {
    const connection = await mongoClient;
    return connection.db(MONGODB_DATABASE);
}

export const getCollection = async <TSchema extends Document = Document>(name: string, db?: Db) => {
    if (db) {
        return db.collection<TSchema>(name);
    } else {
        const db = await getDb();
        return db.collection<TSchema>(name);
    }
}
