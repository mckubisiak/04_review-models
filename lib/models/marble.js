import pool from '../utils/pool'

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
    )
    return new Marble(rows[0])
}

static async getById(id) {
    const { rows } = await pool.query(
        `SELECT * 
        FROM marbles 
        WHERE id=$1`,
        [id]
    )
    return new Marble(rows[0])
}
}