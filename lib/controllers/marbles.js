/* eslint-disable indent */
import { Router } from 'express';
import Marble from '../models/marble';

export default Router()
    .post('/', async (req, res, next) => {
        try {
            const marble = await Marble.insert(req.body);

            res.send(marble);
        }
        catch(err) {
            next(err);
        }
    })
    .get('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;

            const marble = await Marble.getById(id);

            res.send(marble);
        }
        catch(err) {
            next(err);
        }
    })
    .get('/', async (req, res, next) => {
        try {
            const marbles = await Marble.getAll();

            res.send(marbles);
        }
        catch(err) {
            next(err);
        }
    })
    .put('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const { name, cost, description } = req.body;
            
            const updatedMarble = await Marble.updateById(id, { name, cost, description });
            
            res.send(updatedMarble);
        } catch (err) {
            next(err);
    }}).delete('/:id', async (req, res, next) => {
        try {
            const { id } = req.params;
            const marble = await Marble.deleteById(id);

            res.send({
                message: `${marble.name} marble has been crushed`
                
            });
        }
        catch(err) {
            next(err);
        }
    });


