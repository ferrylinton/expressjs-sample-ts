import express, { Express } from 'express';
import authorityRouter from './routes/authority-route';
import imageRouter from './routes/image-route';
import cors from 'cors';
import helmet from 'helmet';
import { restErrorHandler } from './handlers/rest-error-handler';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

app.use('/api/authorities', authorityRouter);
app.use('/api/images', imageRouter);

app.use(restErrorHandler);

export default app;