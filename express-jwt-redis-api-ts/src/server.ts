import { address } from 'ip';
import app from './app';
import { PORT } from './configs/env-constant';
import { initSchema } from './schemas/init-schema';

const callback = () => {
  console.log(`[SERVER] Server is running at 'http://${address()}:${PORT}'`);
};

initSchema()
  .then(() => {
    app.listen(parseInt(PORT), callback);
  })
  .catch(error => {
    console.error(error);
    process.exit();
  });

