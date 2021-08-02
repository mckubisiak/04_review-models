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
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const homework = await Homework.getById(id);
      res.send(homework);
    } catch (err) {
      next(err);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const homeworks = await Homework.getAll();
      res.send(homeworks);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const { name, completed } = req.body;
      const updatedHomework = await Homework.updateById(id, {
        name,
        completed
      });
      res.send(updatedHomework);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const homework = await Homework.deleteById(id);
      res.send({
        message: `Ruby ate my ${homework.name} homework`,
      });
    } catch (err) {
      next(err);
    }
  })
  ;

