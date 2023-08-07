import dotenv from 'dotenv';
import app from './app';
import { connectToMongodb } from './config/mongodb-db';

dotenv.config();

const port = process.env.PORT || 3000;

const callback = () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}

connectToMongodb().then(
  function () {
    app.listen(port, callback);
  },
  function (error) {
    console.log(error);
  }
);

