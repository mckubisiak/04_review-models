import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Marble from '../lib/models/marble.js';
import Snake from '../lib/models/snake.js';
import Book from '../lib/models/book.js';
import Hook from '../lib/models/hook.js';
import Homework from '../lib/models/homework.js';

describe('marble routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST creates a marble', async () => {
    const earth = {
      name: 'Earth',
      cost: 5,
      description: 'magnificant object, terrible inhabitants',
    };

    const res = await request(app).post('/api/v1/marbles').send(earth);

    expect(res.body).toEqual({
      id: '1',
      ...earth,
    });
  });

  it('GET a single marble', async () => {
    const earth = await Marble.insert({
      name: 'Earth',
      cost: 5,
      description: 'magnificant object, terrible inhabitants',
    });

    const res = await request(app).get(`/api/v1/marbles/${earth.id}`);

    expect(res.body).toEqual({
      id: '1',
      ...earth,
    });
  });

  it('GET all marbles', async () => {
    const earth = await Marble.insert({
      name: 'Earth',
      cost: 5,
      description: 'magnificant object, terrible inhabitants',
    });

    const cateye = await Marble.insert({
      name: 'Cateye',
      cost: 15,
      description: 'watch your back',
    });

    const solidRed = await Marble.insert({
      name: 'Solid Red',
      cost: 11,
      description: 'stnadard red thru & thru',
    });

    return request(app)
      .get('/api/v1/marbles')
      .then((res) => {
        expect(res.body).toEqual([earth, cateye, solidRed]);
      });
  });

  it('PUT updates a single marble', async () => {
    const earth = await Marble.insert({
      name: 'Earth',
      cost: 5,
      description: 'magnificant object, terrible inhabitants',
    });

    const res = await request(app)
      .put(`/api/v1/marbles/${earth.id}`)
      .send({ description: 'a classic' });

    expect(res.body).toEqual({ ...earth, description: 'a classic' });
  });

  it('DELETE a single marble', async () => {
    const earth = await Marble.insert({
      name: 'Earth',
      cost: 5,
      description: 'magnificant object, terrible inhabitants',
    });

    const res = await request(app).delete(`/api/v1/marbles/${earth.id}`);

    expect(res.body).toEqual({
      message: `${earth.name} marble has been crushed`,
    });
  });
});

describe('snake routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST creates a snake', async () => {
    const ophiophaguHannah = {
      name: 'King Cobra',
      body_length: 11,
      venomous: 'YES',
    };
    const res = await request(app)
      .post('/api/v1/snakes')
      .send(ophiophaguHannah);
    expect(res.body).toEqual({
      id: '1',
      ...ophiophaguHannah,
    });
  });

  it('GET a single snake', async () => {
    const ophiophaguHannah = await Snake.insert({
      name: 'King Cobra',
      body_length: 11,
      venomous: 'YES',
    });
    const res = await request(app).get(`/api/v1/snakes/${ophiophaguHannah.id}`);
    expect(res.body).toEqual({
      id: '1',
      ...ophiophaguHannah,
    });
  });

  it('GET all snakes', async () => {
    const ophiophaguHannah = await Snake.insert({
      name: 'King Cobra',
      body_length: 11,
      venomous: 'YES',
    });

    const agkistrodonContortrix = await Snake.insert({
      name: 'Copperhead',
      body_length: 3,
      venomous: 'YES',
    });

    const corallusCaninus = await Snake.insert({
      name: 'King Cobra',
      body_length: 5,
      venomous: 'NO',
    });

    return request(app)
      .get('/api/v1/snakes')
      .then((res) => {
        expect(res.body).toEqual([
          ophiophaguHannah,
          agkistrodonContortrix,
          corallusCaninus,
        ]);
      });
  });

  it('PUT updates a snake', async () => {
    const agkistrodonContortrix = await Snake.insert({
      name: 'Copperhead',
      body_length: 3,
      venomous: 'YES',
    });
    const res = await request(app)
      .put(`/api/v1/snakes/${agkistrodonContortrix.id}`)
      .send({ body_length: 4 });
    expect(res.body).toEqual({ ...agkistrodonContortrix, body_length: 4 });
  });

  it('DELETE a single snake', async () => {
    const agkistrodonContortrix = await Snake.insert({
      name: 'Copperhead',
      body_length: 3,
      venomous: 'YES',
    });
    const res = await request(app).delete(
      `/api/v1/snakes/${agkistrodonContortrix.id}`
    );
    expect(res.body).toEqual({
      message: `${agkistrodonContortrix.name} has been vanquished`,
    });
  });
});

describe('book routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST creates a book', async () => {
    const gwtw = {
      title: 'Gone with the Wind',
      genre: 'Historical Fiction',
      description: 'honestly its sad, lets not talk about it',
    };

    const res = await request(app).post('/api/v1/books').send(gwtw);

    expect(res.body).toEqual({
      id: '1',
      ...gwtw,
    });
  });

  it('GET a single book', async () => {
    const gwtw = await Book.insert({
      title: 'Gone with the Wind',
      genre: 'Historical Fiction',
      description: 'honestly its sad, lets not talk about it',
    });
    const res = await request(app).get(`/api/v1/books/${gwtw.id}`);

    expect(res.body).toEqual({
      id: '1',
      ...gwtw,
    });
  });

  it('GET all books', async () => {
    const gwtw = await Book.insert({
      title: 'Gone with the Wind',
      genre: 'Historical Fiction',
      description: 'honestly its sad, lets not talk about it',
    });

    const twg = await Book.insert({
      title: 'The Westing Game',
      genre: 'Mystery',
      description: 'risky dinner party at rich guys will reading',
    });

    const cu = await Book.insert({
      title: 'Captain Underpants',
      genre: 'Superhero',
      description: 'idk I just have fond memories of it as a kid',
    });

    return request(app)
      .get('/api/v1/books')
      .then((res) => {
        expect(res.body).toEqual([gwtw, twg, cu]);
      });
  });

  it('PUT updates a single book', async () => {
    const gwtw = await Book.insert({
      title: 'Gone with the Wind',
      genre: 'Historical Fiction',
      description: 'honestly its sad, lets not talk about it',
    });
    const res = await request(app)
      .put(`/api/v1/books/${gwtw.id}`)
      .send({ description: 'a classic' });
    expect(res.body).toEqual({ ...gwtw, description: 'a classic' });
  });

  it('DELETE a single book', async () => {
    const gwtw = await Book.insert({
      title: 'Gone with the Wind',
      genre: 'Historical Fiction',
      description: 'honestly its sad, lets not talk about it',
    });
    const res = await request(app).delete(`/api/v1/books/${gwtw.id}`);
    expect(res.body).toEqual({ message: `${gwtw.title} has been burned` });
  });
});

describe('hook routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST creates a hook', async () => {
    const jHook = {
      name: 'J-Hook',
      type: 'Home',
      length: 6,
    };

    const res = await request(app).post('/api/v1/hooks').send(jHook);

    expect(res.body).toEqual({
      id: '1',
      ...jHook,
    });
  });

  it('GET a single hook', async () => {
    const jHook = await Hook.insert({
      name: 'J-Hook',
      type: 'Home',
      length: 6,
    });
    const res = await request(app).get(`/api/v1/hooks/${jHook.id}`);

    expect(res.body).toEqual({
      id: '1',
      ...jHook,
    });
  });

  it('GET all hooks', async () => {
    const jHook = await Hook.insert({
      name: 'J-Hook',
      type: 'Home',
      length: 6,
    });

    const eClaw = await Hook.insert({
      name: 'Eagle Claw',
      type: 'Fishing',
      length: 1,
    });

    const argHook = await Hook.insert({
      name: 'Pirate Hook',
      type: 'Misc',
      length: 7,
    });

    return request(app)
      .get('/api/v1/hooks')
      .then((res) => {
        expect(res.body).toEqual([jHook, eClaw, argHook]);
      });
  });

  it('PUT updates a single hook', async () => {
    const argHook = await Hook.insert({
      name: 'Pirate Hook',
      type: 'Misc',
      length: 7,
    });
    const res = await request(app)
      .put(`/api/v1/hooks/${argHook.id}`)
      .send({ length: 9 });
    expect(res.body).toEqual({ ...argHook, length: 9 });
  });

  it('DELETE a single hook', async () => {
    const argHook = await Hook.insert({
      name: 'Pirate Hook',
      type: 'Misc',
      length: 7,
    });
    const res = await request(app).delete(`/api/v1/hooks/${argHook.id}`);
    expect(res.body).toEqual({ message: `${argHook.name} has been removed` });
  });
});

describe('homework routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST creates an assignment', async () => {
    const lab1 = {
      name: 'lab 1',
      completed: true,
    };

    const res = await request(app).post('/api/v1/homeworks').send(lab1);

    expect(res.body).toEqual({
      id: '1',
      ...lab1,
    });
  });

  it('GET a single assignments', async () => {
    const lab1 = await Homework.insert({
      name: 'lab 1',
      completed: true,
    });
    const res = await request(app).get(`/api/v1/homeworks/${lab1.id}`);

    expect(res.body).toEqual({
      id: '1',
      ...lab1,
    });
  });

  it('GET all assignments', async () => {
    const lab1 = await Homework.insert({
      name: 'lab 1',
      completed: true,
    });

    const lab4 = await Homework.insert({
      name: 'lab 4',
      completed: false,
    });

    const lab8 = await Homework.insert({
      name: 'lab 8',
      completed: false,
    });

    return request(app)
      .get('/api/v1/homeworks')
      .then((res) => {
        expect(res.body).toEqual([lab1, lab4, lab8]);
      });
  });

  it('PUT updates a single homeworks', async () => {
    const lab4 = await Homework.insert({
      name: 'lab 4',
      completed: false,
    });

    const res = await request(app)
      .put(`/api/v1/homeworks/${lab4.id}`)
      .send({ completed: true });
    expect(res.body).toEqual({ ...lab4, completed: true });
  });

  it('DELETE a single homeworks', async () => {
    const lab4 = await Homework.insert({
      name: 'lab 4',
      completed: true,
    });

    const res = await request(app).delete(`/api/v1/homeworks/${lab4.id}`);
    expect(res.body).toEqual({ message: `Ruby ate my ${lab4.name} homework` });
  });
});
