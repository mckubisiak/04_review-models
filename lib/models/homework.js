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
      `INSERT INTO homeworks (name, completed) VALUES ($1, $2) RETURNING *`,
      [name, completed]
    );
    return new Homework(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * 
      FROM homeworks 
      WHERE id=$1`,
      [id]
    );
    return new Homework(rows[0]);
  }
  static async getAll() {
    const { rows } = await pool.query(
      `SELECT * 
      FROM homeworks`
    );
    return rows.map((row) => new Homework(row));
  }

  static async updateById(id, { name, completed }) {
    const currentHomework = await Homework.getById(id);
    const newName = name ?? currentHomework.name;
    const newCompleted = completed ?? currentHomework.completed;

    const { rows } = await pool.query(
      `UPDATE homeworks 
      SET name=$1, completed=$2 
      WHERE id=$3 RETURNING *`,
      [newName, newCompleted, id]
    );
    return new Homework(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM homeworks
      WHERE id=$1
      RETURNING *`,
      [id]
    );
    return new Homework(rows[0]);
  }
}
