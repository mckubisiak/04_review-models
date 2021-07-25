import pool from '../lib/utils/pool.js';
import setup from '../data/setup.js';
import request from 'supertest';
import app from '../lib/app.js';
import Marble from '../lib/models/marble.js';

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
});






