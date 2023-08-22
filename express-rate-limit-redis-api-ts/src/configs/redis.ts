import { createClient } from 'redis';
import { REDIS_URL } from './constant';


const redisClient = createClient({
    url: REDIS_URL,
    legacyMode: true
})

redisClient.on("connect", () => {
    console.log(`[SERVER] Redis connection established`);
});

redisClient.on("reconnecting", () => {
    console.error(`[SERVER] Client is trying to reconnect to the server`);
});

redisClient.on("error", (error) => {
    console.error(`[SERVER] Redis error, service degraded: ${error}`);
});

export default redisClient;