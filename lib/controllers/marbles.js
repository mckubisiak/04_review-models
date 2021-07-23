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
    });
