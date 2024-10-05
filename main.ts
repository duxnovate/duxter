import dotenv from "dotenv";
import fastify from "@utils/logger";
import db from "@database/config/connection";
import registerRoutes from "./src/app";

dotenv.config();

const colorGreen = "\x1b[32m";
const colorRed = "\x1b[31m";
const colorReset = "\x1b[0m";

registerRoutes(fastify);

const start = async () => {
  const port = parseInt(process.env.PORT!);
  const host = process.env.DB_HOST!;

  try {
    await db.raw("SELECT 1");
    console.log(
      `${colorGreen}🚀 [DB] Connected to the database successfully!${colorReset}`
    );
  } catch (err) {
    console.error(
      `${colorRed}⚠️ [DB] Failed to connect to the database. The app will continue to run.${colorReset}`
    );
    console.error(`${colorRed}${(err as Error).message}${colorReset}`);
  }

  try {
    await fastify.listen({ port, host });
    console.log(
      `${colorGreen}🌍 [Server] Running at: http://${host}:${port}${colorReset}`
    );
  } catch (err) {
    fastify.log.error(err);
    console.error(
      `${colorRed}❌ [Server] Failed to start. Exiting...${colorReset}`
    );
    process.exit(1);
  }
};

start();
