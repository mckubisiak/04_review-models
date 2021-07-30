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

  static async getById(id) {
    const { rows } = await pool.query(
      `SELECT * 
        FROM books 
        WHERE id=$1`,
      [id]
    );
    return new Book(rows[0]);
  }

  static async getAll() {
    const { rows } = await pool.query(
      `SELECT * 
        FROM books`
    );
    return rows.map((row) => new Book(row));
  }

  static async updateById(id, { title, genre, description }) {
    const currentBook = await Book.getById(id);
    const newTitle = title ?? currentBook.title;
    const newGenre = genre ?? currentBook.genre;
    const newDescription = description ?? currentBook.description;

    const { rows } = await pool.query(
      `UPDATE books SET title=$1, genre=$2, description=$3 WHERE id=$4 RETURNING *`,
      [newTitle, newGenre, newDescription, id]
    );
    return new Book(rows[0]);
  }

}
