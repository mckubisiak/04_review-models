/* eslint-disable indent */
import { Router } from 'express';
import Homework from '../models/homework';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const homework = await Homework.insert(req.body);
      res.send(homework);
    } catch (err) {
      next(err);
    }
  })
  ;
