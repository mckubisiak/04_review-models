import pool from '../utils/pool';

export default class Hook {
  id;
  name;
  type;
  length;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.type = row.type;
    this.length = row.length;
  }

  static async insert({ name, type, length }) {
    const { rows } = await pool.query(
      `INSERT INTO hooks (name, type, length) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
      [name, type, length]
    );
    return new Hook(rows[0]);
  }

  

 

  
  
}
