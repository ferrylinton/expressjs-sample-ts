import express, { Express } from 'express';
import indexRouter from './router/index-router';

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRouter);

export default app;