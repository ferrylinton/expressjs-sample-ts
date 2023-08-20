import cookieParser from "cookie-parser";
import express, { Express } from 'express';
import helmet from 'helmet';
import { COOKIE_SECRET } from './configs/constant';
import { corsHandler } from './handlers/cors-handler';
import { ipWhitelistHandler } from './handlers/ip-whitelist-handler';
import { notFoundHandler } from './handlers/not-found-handler';
import { restErrorHandler } from './handlers/rest-error-handler';
import cookieRouter from './routes/cookie-route';
import indexRouter from './routes/index-route';
import todoRouter from './routes/todo-route';
import { logRequestHandler } from "./handlers/log-request-handler";


const app: Express = express();

app.use(logRequestHandler);
app.use(ipWhitelistHandler);
app.use(corsHandler);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(cookieParser(COOKIE_SECRET))

app.use('/', indexRouter);
app.use('/api/todoes', todoRouter);
app.use('/api/cookies', cookieRouter);

app.use(notFoundHandler);
app.use(restErrorHandler);


export default app;