import express from 'express';
import notFoundMiddleware from './middleware/not-found.js';
import errorMiddleware from './middleware/error.js';
import marblesController from './controllers/marbles.js';
import snakesController from './controllers/snakes.js';
import booksController from './controllers/books';
import hooksController from './controllers/hooks';

const app = express();

app.use(express.json());

app.use('/api/v1/marbles', marblesController);
app.use('/api/v1/snakes', snakesController);
app.use('/api/v1/books', booksController);
app.use('/api/v1/hooks', hooksController);

app.use(notFoundMiddleware);
app.use(errorMiddleware);

export default app;
