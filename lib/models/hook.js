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



}
