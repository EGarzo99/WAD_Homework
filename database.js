// database.js
const Pool = require('pg').Pool;
const pool = new Pool({
    user: "postgres",
    password: "pass",
    database: "Homework",
    host: "localhost",
    port: "5432"
});

//Setup DB tables if they do not exist
async function initDB() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "Users" (
        user_id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
      );
    `);

    // Tabla Posts
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "Posts" (
        post_id SERIAL PRIMARY KEY,
        user_id INT REFERENCES "Users"(user_id) ON DELETE CASCADE,
        body TEXT NOT NULL,
        date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
        likes INT DEFAULT 0
      );
    `);

    console.log('Database initialized: tables Users and Posts exist.');
  } catch (err) {
    console.error('Error initializing database:', err);
  }
}

initDB();

module.exports = pool;