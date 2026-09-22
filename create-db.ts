import mysql from "mysql2/promise";
import "dotenv/config";

async function createDatabase() {
  const connection = await mysql.createConnection({
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
  });

  const dbName = process.env.DB_NAME || "elysia_db";
  await connection.query(`CREATE DATABASE IF NOT EXISTS \`${dbName}\`;`);
  console.log(`? Database "${dbName}" berhasil dibuat atau sudah ada!`);
  
  await connection.end();
}

createDatabase().catch(console.error);
