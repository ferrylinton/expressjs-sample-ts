import { createClient } from 'redis';
import { REDIS_SOCKET_PATH, REDIS_URL } from './env-constant';


const redisClient = createClient(REDIS_SOCKET_PATH ?
    {
        socket: {
            path: REDIS_SOCKET_PATH
        }
    } :
    {
        url: REDIS_URL
    });


redisClient.on("connect", () => {
    console.log(`Redis connection established`);
});

redisClient.on("error", (error) => {
    console.error(`Redis error, service degraded: ${error}`);
});

export default redisClient;