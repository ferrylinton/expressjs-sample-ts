import app from './app';
import { PORT } from './configs/constant';
import connect from './configs/mongoose';
import { logger } from './configs/winston';
import { address } from 'ip';

(async function () {
  try {
    await connect;

    app.listen(parseInt(PORT), '0.0.0.0', () => {
      logger.log({
        server: true,
        level: 'info',
        message: `SERVER :: Server is running at 'http://${address()}:${PORT}'`
      });

    });

  } catch (error: any) {
    logger.log({
      server: true,
      level: 'info',
      message: `SERVER :: ${error.message}`
    });

    process.exit();
  }
})();
