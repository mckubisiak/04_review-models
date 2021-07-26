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
}
