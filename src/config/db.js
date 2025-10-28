import pg from "pg";
import dotenv from "dotenv";
import e from "express";
dotenv.config();

const { Pool } = pg;

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

export async function testConnection() {
  try {
    const client = await pool.connect();
    console.log("Conexión a la base de datos exitosa");
    client.release();
  } catch (err) {
    console.error("Error al conectar a la base de datos:", err);
  }
};

