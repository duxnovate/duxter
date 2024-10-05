import knex from "knex";
import knexConfig from "@configs/knex";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

// Get __filename and __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Initialize Knex
const db = knex(knexConfig);

interface MigrationResults {
  success: string[];
  failure: string[];
}

const runMigrations = async () => {
  const migrationsDir = path.join(__dirname, "../migrations");
  const migrationResults: MigrationResults = {
    success: [],
    failure: [],
  };

  try {
    const files = await fs.readdir(migrationsDir);

    for (const file of files) {
      if (path.extname(file) === ".sql") {
        const migrationFilePath = path.join(migrationsDir, file);
        const sql = await fs.readFile(migrationFilePath, "utf8");

        try {
          await db.raw(sql);
          console.log(`✅ Migration executed successfully: ${file}`);
          migrationResults.success.push(file);
        } catch (error) {
          console.error(
            `❌ Error executing migration ${file}:`,
            (error as Error).message
          );
          migrationResults.failure.push(file);
        }
      }
    }
  } catch (err) {
    console.error("Error reading migrations directory:", err);
  } finally {
    await db.destroy();
  }

  console.log("\nMigration Summary:");
  console.log(
    `Total Migrations: ${
      migrationResults.success.length + migrationResults.failure.length
    }`
  );
  console.log(`Successful Migrations: ${migrationResults.success.length}`);
  console.log(`Failed Migrations: ${migrationResults.failure.length}`);

  if (migrationResults.failure.length > 0) {
    console.log(
      "Failed Migrations Files:",
      migrationResults.failure.join(", ")
    );
  }
};

runMigrations();
