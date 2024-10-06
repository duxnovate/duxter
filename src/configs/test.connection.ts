// src/database/config/testConnection.ts
import dotenv from "dotenv";
import path from "path";
import knex from "knex";
import knexConfig from "@plugins/knex";

// Muat environment berdasarkan NODE_ENV
const env = process.env.NODE_ENV || "development";
const envFilePath =
  env === "production"
    ? path.resolve(__dirname, "../../../.env.production")
    : path.resolve(__dirname, "../../../.env.development");

// Muat file .env yang sesuai
dotenv.config({ path: envFilePath });
console.log(`✅ Loaded environment from ${envFilePath}`);

// Inisialisasi koneksi database
const db = knex(knexConfig);

// Fungsi untuk menguji koneksi ke database
const testConnection = async () => {
  try {
    await db.raw("SELECT 1");
    console.log("✅ Database connected successfully!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Failed to connect to the database:");
      console.error(error.message);
    } else {
      console.error("❌ An unknown error occurred.");
    }
  } finally {
    await db.destroy();
  }
};

// Jalankan uji koneksi
testConnection();
