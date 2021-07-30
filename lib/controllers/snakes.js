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
}).get('/', async (req, res, next) => {
    try {
        const snakes = await Snake.getAll();
        res.send(snakes);
    }
    catch(err) {
        next(err);
    }
}).put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { name, body_length, venomous } = req.body;
        const newSnake = await Snake.updateById(id, { name, body_length, venomous });
        res.send(newSnake);
    } 
    catch (err) {
        next(err);
    }
}).delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const snake = await Snake.deleteById(id);

        res.send({
            message: `${snake.name} has been vanquished`
            
        });
    }
    catch(err) {
        next(err);
    }
})
;

