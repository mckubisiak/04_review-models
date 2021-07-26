import pool from '../utils/pool'

export default class Marble {
    id;
    name;
    body_length;
    venmous;


constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.body_length = row.body_length;
    this.venmous = row.venmous;
}

