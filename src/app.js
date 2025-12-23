import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import allRoutes from './routes.js';
import { syntaxError, errorHandler } from '#middlewares';

const app = express();

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(syntaxError);

app.get('/', (req, res) => {
  res.send('Bienvenido al API de TMS Admin');
});

app.use('/api', allRoutes);

app.use(errorHandler);


export default app;