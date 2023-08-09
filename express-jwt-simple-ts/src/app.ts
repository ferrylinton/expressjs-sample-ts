import cors from 'cors';
import express, { Express } from 'express';
import favicon from 'express-favicon';
import helmet from 'helmet';
import { securityConfig } from './config/security';
import { restErrorHandler } from './middleware/rest-error-handler';
import authRouter from './routes/auth-route';
import todoRouter from './routes/todo-route';


const app: Express = express();

app.use(favicon(__dirname + '/public/favicon.png'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(helmet());

app.use(cors());
app.options('*', cors());

app.use(securityConfig())

app.get('/', (req, res) => {
    res.json({ message: 'ok' })
});

app.use('/api/authenticate', authRouter)
app.use('/api/todos', todoRouter);

app.use(restErrorHandler);

app.get('*', function (req, res) {
    res.status(404).send({ message: 'Resource is not found' });
});

export default app;