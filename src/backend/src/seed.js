// Seed script to create initial users
const { Client } = require('pg');
const bcrypt = require('bcrypt');

async function seed() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  const password = process.env.SEED_PASSWORD || 'Seed!Passw0rd';
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    await client.connect();
    console.log('Connected to database');

    // Get role IDs
    const roles = await client.query('SELECT id, nombre FROM rol');
    const roleMap = {};
    roles.rows.forEach(r => roleMap[r.nombre] = r.id);

    // Create users
    const users = [
      { email: 'admin@seed.local', roles: ['admin'] },
      { email: 'staff@seed.local', roles: ['staff'] },
      { email: 'paciente1@seed.local', roles: ['patient'] },
      { email: 'paciente2@seed.local', roles: ['patient'] },
      { email: 'paciente3@seed.local', roles: ['patient'] },
      { email: 'gomez@seed.local', roles: ['professional'] },
      { email: 'lopez@seed.local', roles: ['professional'] },
    ];

    for (const user of users) {
      const res = await client.query(
        `INSERT INTO usuario (email, password_hash) VALUES ($1, $2) RETURNING id`,
        [user.email, hashedPassword]
      );
      const userId = res.rows[0].id;

      // Assign roles
      for (const roleName of user.roles) {
        await client.query(
          `INSERT INTO usuario_rol (usuario_id, rol_id) VALUES ($1, $2)`,
          [userId, roleMap[roleName]]
        );
      }
    }

    console.log('Database seeded successfully');
  } catch (err) {
    console.error('Seeding failed', err);
    process.exit(1);
  } finally {
    await client.end();
  }
}

seed();