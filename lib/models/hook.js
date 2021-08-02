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

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * 
        FROM hooks 
        WHERE id=$1`,
      [id]
    );
    return new Hook(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT * 
        FROM hooks`
    );
    return rows.map((row) => new Hook(row));
  }

  static async updateById(id, { name, type, length }) {
    const currentHook = await Hook.getById(id);
    const newName = name ?? currentHook.name;
    const newType = type ?? currentHook.type;
    const newLength = length ?? currentHook.length;
    
    const { rows } = await pool.query(
      `UPDATE hooks SET name=$1, type=$2, length=$3 WHERE id=$4 RETURNING *`,
      [newName, newType, newLength, id]
    );
    return new Hook(rows[0]);
  }

  static async deleteById(id) {
    const { rows } = await pool.query(
      `DELETE FROM  hooks
        WHERE id=$1
       RETURNING *`,
      [id]
    );
    return new Hook(rows[0]);
  }
}
