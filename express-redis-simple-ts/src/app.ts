import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { restErrorHandler } from './middleware/rest-error-handler';
import userRouter from './routes/user-routes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

app.use('/api/users', userRouter);
app.use(restErrorHandler);

export default app;