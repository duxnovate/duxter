import dotenv from "dotenv";
import { Knex } from "knex";

dotenv.config();

const knexConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5433, // change default port if you have your own post
    user: process.env.DB_USER || "postgres", // change  default DB if you want to use sql, sqlite or others
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME || "example", // change default DB
  },
};

export default knexConfig;
