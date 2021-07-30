import pool from '../utils/pool'

export default class Snake {
    id;
    name;
    body_length;
    venmous;
    
    constructor(row) {
        this.id = row.id;
        this.name = row.name;
        this.body_length = row.body_length;
        this.venomous = row.venomous;
    }
    static async insert({ name, body_length, venomous }) {
        const { rows } = await pool.query(
            `INSERT INTO snakes (name, body_length, venomous) 
            VALUES ($1, $2, $3) 
            RETURNING *`,
            [name, body_length, venomous]
            )
            return new Snake(rows[0])
    }
    static async getById(id) {
        const { rows } = await pool.query(
            `SELECT * 
            FROM snakes 
            WHERE id=$1`,
            [id]
        )
        return new Snake(rows[0])
    }
    static async getAll() {
        const { rows } = await pool.query(
            `SELECT * 
            FROM snakes`
        )
        return rows.map((row) => new Snake(row));
    }
    static async updateById(id, { name, body_length, venomous }) {
        const currentSnake = await Snake.getById(id);
        const  newName = name ?? currentSnake.name;
        const newBody_length = body_length ?? currentSnake.body_length;
        const newVenomous = venomous ?? currentSnake.venomous;
        
        const { rows } = await pool.query(
            `UPDATE snakes SET name=$1, body_length=$2, venomous=$3 WHERE id=$4 RETURNING *`,
            [newName, newBody_length, newVenomous, id]
        );
        return new Snake(rows[0])
    }
    static async deleteById(id) {
        const { rows } = await pool.query(
            `DELETE FROM snakes
            WHERE id=$1
           RETURNING *`,
            [id]
        );
        return new Snake(rows[0])
    }    
}
