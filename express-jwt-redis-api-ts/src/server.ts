import { address } from 'ip';
import app from './app';
import { PORT } from './configs/env-constant';
import { initSchema } from './schemas/init-schema';
import redisClient from './configs/redis';

const callback = () => {
  console.log(`[SERVER] Server is running at 'http://${address()}:${PORT}'`);
};

(async () => {

  try {
    await initSchema();
    await redisClient.connect();
    app.listen(parseInt(PORT), "0.0.0.0", callback);
  } catch (error) {
    console.error(error);
    process.exit();
  }

})()


