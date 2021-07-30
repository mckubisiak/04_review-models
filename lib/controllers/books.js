/* eslint-disable indent */
import { Router } from 'express';
import Book from '../models/book';

export default Router()
  .post('/', async (req, res, next) => {
    try {
      const book = await Book.insert(req.body);
      res.send(book);
    } catch (err) {
      next(err);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const { id } = req.params;
      const book = await Book.getById(id);
      res.send(book);
    } catch (err) {
      next(err);
    }
  });
