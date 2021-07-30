import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Marble from '../lib/models/marble.js';
import Snake from '../lib/models/snake.js';


describe('marble routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST creates a marble', async () => {
    const earth = { 
      name: 'Earth', 
      cost: 5, 
      description: 'magnificant object, terrible inhabitants' 
    };

    const res = await request(app).post('/api/v1/marbles').send(earth);

    expect(res.body).toEqual({
      id: '1',
      ...earth
    });
  });
  
  it('GET a single marble', async () => {
    const earth = await Marble.insert({ 
      name: 'Earth', 
      cost: 5, 
      description: 'magnificant object, terrible inhabitants' 
    });
    
    const res = await request(app).get(`/api/v1/marbles/${earth.id}`);
    
    expect(res.body).toEqual({
      id: '1',
      ...earth
    });
  });

  it('GET all marbles', async () => {
    const earth = await Marble.insert({ 
      name: 'Earth', 
      cost: 5, 
      description: 'magnificant object, terrible inhabitants' 
    });
    
    const cateye = await Marble.insert({ 
      name: 'Cateye', 
      cost: 15, 
      description: 'watch your back' 
    });
    
    const solidRed = await Marble.insert({ 
      name: 'Solid Red', 
      cost: 11, 
      description: 'stnadard red thru & thru' 
    });
    
    return request(app).get('/api/v1/marbles').then((res) => {
      expect(res.body).toEqual([earth, cateye, solidRed]);
    });
  });

  it('PUT updates a single marble', async () => {
    const earth = await Marble.insert({ 
      name: 'Earth', 
      cost: 5, 
      description: 'magnificant object, terrible inhabitants' 
    });

    const res = await request(app).put(`/api/v1/marbles/${earth.id}`)
      .send({ description: 'a classic' });

    expect(res.body).toEqual({ ...earth, description: 'a classic' });
  });

  it('DELETE a single marble', async () => {
    const earth = await Marble.insert({ 
      name: 'Earth', 
      cost: 5, 
      description: 'magnificant object, terrible inhabitants' 
    });

    const res = await request(app).delete(`/api/v1/marbles/${earth.id}`);

    expect(res.body).toEqual({ message: `${earth.name} marble has been crushed` });
  });
});



describe('snake routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST creates a snake', async () => {
    const ophiophaguHannah  = { 
      name: 'King Cobra', 
      body_length: 11, 
      venomous: 'YES' 
    };
    const res = await request(app).post('/api/v1/snakes').send(ophiophaguHannah);
    expect(res.body).toEqual({
      id: '1',
      ...ophiophaguHannah
    });
  });

  it('GET a single snake', async () => {
    const ophiophaguHannah  = await Snake.insert({ 
      name: 'King Cobra', 
      body_length: 11, 
      venomous: 'YES' 
    });
    const res = await request(app).get(`/api/v1/snakes/${ophiophaguHannah.id}`);
    expect(res.body).toEqual({
      id: '1',
      ...ophiophaguHannah
    });
  });
  
  it('GET all snakes', async () => {
    const ophiophaguHannah  = await Snake.insert({ 
      name: 'King Cobra', 
      body_length: 11, 
      venomous: 'YES' 
    });
    
    const agkistrodonContortrix  = await Snake.insert({ 
      name: 'Copperhead', 
      body_length: 3, 
      venomous: 'YES' 
    });

    const corallusCaninus  = await Snake.insert({ 
      name: 'King Cobra', 
      body_length: 5, 
      venomous: 'NO' 
    });
    
    return request(app).get('/api/v1/snakes').then((res) => {
      expect(res.body).toEqual([ophiophaguHannah, agkistrodonContortrix, corallusCaninus]);
    });
  });

  it('PUT updates a snake', async () => {
    const agkistrodonContortrix  = await Snake.insert({ 
      name: 'Copperhead', 
      body_length: 3, 
      venomous: 'YES' 
    });
    const res = await request(app).put(`/api/v1/snakes/${agkistrodonContortrix.id}`)
      .send({ body_length: 4 });
    expect(res.body).toEqual({ ...agkistrodonContortrix, body_length: 4 });
  });

  it('DELETE a single snake', async () => {
    const agkistrodonContortrix  = await Snake.insert({ 
      name: 'Copperhead', 
      body_length: 3, 
      venomous: 'YES' 
    });
    const res = await request(app).delete(`/api/v1/snakes/${agkistrodonContortrix.id}`);
    expect(res.body).toEqual({ message: `${agkistrodonContortrix.name} has been vanquished` });
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
      description: 'honestly its sad, lets not talk about it' 
    };

    const res = await request(app).post('/api/v1/books').send(gwtw);

    expect(res.body).toEqual({
      id: '1',
      ...gwtw
    });
  });
  
});

