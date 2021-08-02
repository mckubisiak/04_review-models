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
  .get('/', async (req, res, next) => {
    try {
      const hooks = await Hook.getAll();
      res.send(hooks);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, type, length } = req.body;
      const updatedhook = await Hook.updateById(id, {
        name,
        type,
        length,
      });
      res.send(updatedhook);
    } catch (err) {
      next(err);
    }
  })
    ;
