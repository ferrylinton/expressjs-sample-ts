import express, { Express } from 'express';
import favicon from 'express-favicon';
import helmet from 'helmet';
import { corsHandler } from './middleware/cors-handler';
import { notFoundHandler } from './middleware/not-found-handler';
import { restErrorHandler } from './middleware/rest-error-handler';
import indexRouter from './routers/index-router';
import todoRouter from './routers/todo-router';


const app: Express = express();

app.use(favicon(__dirname + '/public/favicon.png'));
app.use(corsHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use('/', indexRouter);
app.use('/api/todoes', todoRouter);

app.use(notFoundHandler);
app.use(restErrorHandler);

export default app;