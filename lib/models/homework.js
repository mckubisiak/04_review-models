import pool from '../utils/pool';

export default class Homework {
  id;
  name;
  completed;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.completed = row.completed;
  }

  static async insert({ name, completed }) {
    const { rows } = await pool.query(
      `INSERT INTO homework (name, completed) 
        VALUES ($1, $2) 
        RETURNING *`,
      [name, completed]
    );
    return new Homework(rows[0]);
  }

}
