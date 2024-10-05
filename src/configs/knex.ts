import "dotenv/config";
import { Knex } from "knex";

const knexConfig: Knex.Config = {
  client: process.env.DB_CLIENT,
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5433, // change default port if you have your own post
    user: process.env.DB_USER || "postgres",
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "example", // change default DB
  },
};

export default knexConfig;
