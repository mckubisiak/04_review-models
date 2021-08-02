import pool from '../utils/pool';

export default class Marble {
  id;
  name;
  cost;
  description;

  constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cost = row.cost;
    this.description = row.description;
  }

  static async insert({ name, cost, description }) {
    const { rows } = await pool.query(
      `INSERT INTO marbles (name, cost, description) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
      [name, cost, description]
    );
    return new Marble(rows[0]);
  }

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * 
        FROM marbles 
        WHERE id=$1`,
      [id]
    );
    return new Marble(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT * 
        FROM marbles`
    );
    return rows.map((row) => new Marble(row));
  }

  static async updateById(id, { name, cost, description }) {
    const currentMarble = await Marble.getById(id);
    const newName = name ?? currentMarble.name;
    const newCost = cost ?? currentMarble.cost;
    const newDescription = description ?? currentMarble.description;

    const { rows } = await pool.query(
      `UPDATE marbles SET name=$1, cost=$2, description=$3 WHERE id=$4 RETURNING *`,
      [newName, newCost, newDescription, id]
    );
    return new Marble(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM marbles
        WHERE id=$1
       RETURNING *`,
      [id]
    );
    return new Marble(rows[0]);
  }
}
