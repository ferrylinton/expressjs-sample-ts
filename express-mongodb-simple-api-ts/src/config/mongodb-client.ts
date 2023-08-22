import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  minPoolSize: 5,
  maxPoolSize: 10,
  maxIdleTimeMS: 10000,
  monitorCommands:true
};

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"')
}

const client = new MongoClient(process.env.MONGODB_URI, options);

//client.on('commandStarted', (event) => console.debug(event));
//client.on('commandSucceeded', (event) => console.debug(event));
client.on('commandFailed', (event) => console.debug(event));

export default client.connect();