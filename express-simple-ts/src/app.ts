import express, { Express } from 'express';
import userRouter from './routes/user-routes';

const app: Express = express();

app.use('/api/users', userRouter);

export default app;