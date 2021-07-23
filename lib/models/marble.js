import pool from '../utils/pool';

export default class Marble {
    id;
    name;
    cost;
    description;
};

constructor(row) {
    this.id = row.id;
    this.name = row.name;
    this.cost = row.cost;
    this.description = row.description;
};


