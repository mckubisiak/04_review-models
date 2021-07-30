import pool from '../utils/pool';

export default class Book {
  id;
  title;
  genre;
  description;

  constructor(row) {
    this.id = row.id;
    this.title = row.title;
    this.genre = row.genre;
    this.description = row.description;
  }

  static async insert({ title, genre, description }) {
    const { rows } = await pool.query(
      `INSERT INTO books (title, genre, description) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
      [title, genre, description]
    );
    return new Book(rows[0]);
  }

}
