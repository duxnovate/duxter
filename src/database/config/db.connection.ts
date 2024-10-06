import knex from "knex";
import knexConfig from "@plugins/knex";

const db = knex(knexConfig);

export default db;
