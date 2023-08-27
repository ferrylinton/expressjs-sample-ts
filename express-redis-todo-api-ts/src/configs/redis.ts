import { createClient } from 'redis';
import { REDIS_URL } from './env-constant';


const redisClient = createClient({
    url: REDIS_URL
})


redisClient.on("connect", () => {
    console.log(`Redis connection established`);
});

redisClient.on("error", (error) => {
    console.error(`Redis error, service degraded: ${error}`);
});

export default redisClient;