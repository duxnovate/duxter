import "dotenv/config";
import fastify from "@utils/logger";
import db from "@database/config/connection";
import registerRoutes from "./src/app";

const color = {
  green: "\x1b[32m",
  red: "\x1b[31m",
  reset: "\x1b[0m",
};

registerRoutes(fastify);

const start = async () => {
  const port = parseInt(process.env.PORT || "3000", 10);
  const host = process.env.DB_HOST || "localhost";

  try {
    await db.raw("SELECT 1");
    console.log(
      `${color.green}🚀 [DB] Connected to the database successfully!${color.reset}`
    );
  } catch (err) {
    console.error(
      `${color.red}⚠️ [DB] Failed to connect to the database. The app will continue to run.${color.reset}`
    );
    console.error(`${color.red}${(err as Error).message}${color.reset}`);
  }

  try {
    await fastify.listen({ port, host });
    console.log(
      `${color.green}🌍 [Server] Running at: http://${host}:${port}${color.reset}`
    );
  } catch (err) {
    fastify.log.error(err);
    console.error(
      `${color.red}❌ [Server] Failed to start. Exiting...${color.reset}`
    );
    process.exit(1);
  }
};

start();
