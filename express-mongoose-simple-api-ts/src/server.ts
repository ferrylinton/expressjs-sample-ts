import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 3001;

const callback = () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
}

app.listen(port, callback);