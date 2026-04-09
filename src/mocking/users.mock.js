const bcrypt = require('bcrypt');

const firstNames = ['Vero', 'Ana', 'Juan', 'Sofi', 'Luca', 'Mateo', 'Mica', 'Pau'];
const lastNames = ['Cardinal', 'Pérez', 'Gómez', 'Rodríguez', 'Fernández', 'Silva'];
const roles = ['user', 'admin'];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

async function generateUsers(count = 50) {
  const total = Number(count) || 0;
  const passwordHash = await bcrypt.hash('coder123', 10);

  const users = Array.from({ length: total }, (_, i) => {
    const first_name = pick(firstNames);
    const last_name = pick(lastNames);

    return {
      first_name,
      last_name,
      email: `${first_name}.${last_name}.${Date.now()}.${i}@test.com`.toLowerCase(),
      age: Math.floor(Math.random() * 60) + 18,
      password: passwordHash,
      role: pick(roles),
      pets: [],
    };
  });

  console.log(`✅ Mock users generados: ${users.length}`);

  if (users.length > 0) {
    console.log('🧪 Ejemplo user mock:', {
      first_name: users[0].first_name,
      last_name: users[0].last_name,
      email: users[0].email,
      age: users[0].age,
      role: users[0].role,
    });
  }

  return users;
}

module.exports = { generateUsers };
