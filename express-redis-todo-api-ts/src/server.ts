import { address } from 'ip';
import app from './app';
import { PORT } from './configs/env-constant';
import redisClient from './configs/redis';

const callback = () => {
  console.log(`[SERVER] Server is running at 'http://${address()}:${PORT}'`);
};

redisClient.connect()
  .then(() => {
    app.listen(parseInt(PORT), callback);
  })
  .catch(error => {
    console.error(error);
    process.exit();
  });

