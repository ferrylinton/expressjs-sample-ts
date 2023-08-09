import dotenv from 'dotenv';
import app from './app';
import client from './config/redis';

dotenv.config();

const port = process.env.PORT || 5000;

client.connect()
  .then(() => {
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.log(error);
  })

