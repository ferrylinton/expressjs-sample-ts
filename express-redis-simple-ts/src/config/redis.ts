import { createClient } from 'redis';
import dotenv from 'dotenv';

dotenv.config();

if (!process.env.REDIS_URL) {
    throw new Error('Invalid environment variable: "REDIS_URL"')
  }

const client = createClient({
    url: process.env.REDIS_URL
})

client.on("connect", () => {
    console.log(`Redis connection established`);
});

client.on("error", (error) => {
    console.error(`Redis error, service degraded: ${error}`);
});

export default client;