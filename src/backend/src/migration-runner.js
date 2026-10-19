// Simple migration runner that executes SQL files
const { Client } = require('pg');
const fs = require('fs');
const path = require('path');

async function runMigration() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Connected to database');

    const migrationFile = path.join(__dirname, '../migrations/001_init.sql');
    const sql = fs.readFileSync(migrationFile, 'utf8');
    await client.query(sql);
    console.log('Migration executed successfully');
  } catch (err) {
    console.error('Migration failed', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

runMigration();