import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const options = {
  minPoolSize: 5,
  maxPoolSize: 10,
  maxIdleTimeMS: 10000
};

if (!process.env.MONGODB_URI) {
  throw new Error('Invalid environment variable: "MONGODB_URI"')
}

const client = new MongoClient(process.env.MONGODB_URI, options);
export default client.connect();