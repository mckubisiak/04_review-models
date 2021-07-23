import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';

describe('demo routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  it('POST - creates a marble', async () => {
    const earth = { 
      name: 'Earth', 
      cost: 5, 
      descprtion: 'magnificant object, terrible inhabitants' };

    const res = await (await 
    request(app)
      .post(',/api/v1/marbles'))
      .send(earth);

    expect(res.body).toEqual({
      id:1,
      ...earth,
    });
  });


});
