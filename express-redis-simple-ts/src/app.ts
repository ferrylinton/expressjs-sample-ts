import cors from 'cors';
import express, { Express } from 'express';
import helmet from 'helmet';
import { restErrorHandler } from './middleware/rest-error-handler';
import redisRouter from './routes/redis-routes';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
    res.json({ message: 'ok' })
});

app.use('/api/redis', redisRouter);

app.use(restErrorHandler);

app.get('*', function (req, res) {
    res.status(404).send({ message: 'Resource is not found' });
});

export default app;