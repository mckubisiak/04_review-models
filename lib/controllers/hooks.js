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
  
    ;
