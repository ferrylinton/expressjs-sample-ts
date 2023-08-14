import express, { Express } from 'express';
import todoRouter from './routes/todo-route';
import cors from 'cors';
import helmet from 'helmet';
import { restErrorHandler } from './handlers/rest-error-handler';
import { restrictOriginHandler } from './handlers/restrict-origin-handler';
import { notFoundHandler } from './handlers/not-found-handler';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(restrictOriginHandler);
app.use(helmet());
app.use(cors());
app.options('*', cors());

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

app.use('/api/todoes', todoRouter);

app.use(notFoundHandler);
app.use(restErrorHandler);

export default app;