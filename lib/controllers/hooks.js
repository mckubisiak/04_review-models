/* eslint-disable indent */
import { Router } from 'express';
import Hook from '../models/hook';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const hook = await Hook.insert(req.body);
      res.send(hook);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const hook = await Hook.getById(id);
      res.send(hook);
    } catch (err) {
      next(err);
    }
  })
    ;
