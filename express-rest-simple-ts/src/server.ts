import app from './app';
import { PORT } from './config/env-constant';


const callback = () => {
  console.log(`[SERVER] Server is running at 'http://127.0.0.1:${PORT}'`);
};

(async () => {

  try {
    app.listen(parseInt(PORT), "0.0.0.0", callback);
  } catch (error) {
    console.log(error);
    process.exit();
  }

})()


