import express, { Express } from 'express';
import favicon from 'express-favicon';
import helmet from 'helmet';
import { corsHandler } from './middleware/cors-handler';
import { ipWhitelistHandler } from './middleware/ip-whitelist-handler';
import { notFoundHandler } from './middleware/not-found-handler';
import { restErrorHandler } from './middleware/rest-error-handler';
import authRouter from './routers/auth-router';
import indexRouter from './routers/index-router';
import todoRouter from './routers/todo-router';
import { authHandler } from './middleware/auth-handler';


const app: Express = express();

app.use(favicon(__dirname + '/public/favicon.png'));
app.use(ipWhitelistHandler);
app.use(corsHandler);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use(authHandler);
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api/todoes', todoRouter);

app.use(notFoundHandler);
app.use(restErrorHandler);

export default app;