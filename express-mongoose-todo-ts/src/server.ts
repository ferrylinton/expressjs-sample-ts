import dotenv from 'dotenv';
import app from './app';
import connect from './configs/mongoose'
import { logger } from './configs/winston';

dotenv.config();
const port = process.env.PORT || 5001;

(async function () {
  try {
    await connect;
    console.log("Successfully connected to MongoDB.")
    logger.info("Successfully connected to MongoDB.");
  } catch (error : any) {
    console.error(error);
    logger.error(error.message);
    process.exit();
  }
})();

app.listen(port, () => {
  logger.info(`Server is running at http://localhost:${port}`);
});