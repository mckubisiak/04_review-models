/* eslint-disable indent */
import { Router } from 'express';
import Snakes from '../models/snake.js';

export default Router()
.post('/', async (req, res, next) => {
    try {
        const snake = await Snakes.insert(req.body);
        res.send(snake);
    }
    catch(err) {
        next(err);
    }
}).get('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const snake = await Snakes.getById(id);
        res.send(snake);
    }
    catch(err) {
        next(err);
    }
});

