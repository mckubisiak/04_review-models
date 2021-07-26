/* eslint-disable indent */
import { Router } from 'express';
import Snake from '../models/snake.js';

export default Router()
.post('/', async (req, res, next) => {
    try {
        const snake = await Snake.insert(req.body);
        res.send(snake);
    }
    catch(err) {
        next(err);
    }
}).get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const snake = await Snake.getById(id);
        res.send(snake);
    }
    catch(err) {
        next(err);
    }
});

