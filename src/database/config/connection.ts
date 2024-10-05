import knex from "knex";
import knexConfig from "@configs/knex";

// Initialize Knex connection
const db = knex(knexConfig);

export default db;
