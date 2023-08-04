import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = 3000;

const callback = () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}

app.listen(port, callback);