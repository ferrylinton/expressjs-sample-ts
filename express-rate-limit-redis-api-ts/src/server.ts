import { address } from 'ip';
import app from './app';
import { PORT } from './configs/constant';
import redisClient from './configs/redis';

redisClient.connect()
  .then(() => {
    app.listen(parseInt(PORT), () => {
      console.log(`[SERVER] Server is running at 'http://${address()}:${PORT}'`);
    });
  })
  .catch(error => {
    console.log(error);
  })


