const bcrypt = require('bcrypt');

const firstNames = ['Vero', 'Ana', 'Juan', 'Sofi', 'Luca', 'Mateo', 'Mica', 'Pau'];
const lastNames = ['Cardinal', 'Pérez', 'Gómez', 'Rodríguez', 'Fernández', 'Silva'];
const roles = ['user', 'admin'];

const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

async function generateUsers(count = 50) {
  const passwordHash = await bcrypt.hash('coder123', 10);

  return Array.from({ length: Number(count) || 0 }, (_, i) => {
    const first_name = pick(firstNames);
    const last_name = pick(lastNames);

    return {
      first_name,
      last_name,
      email: `${first_name}.${last_name}.${Date.now()}.${i}@test.com`.toLowerCase(),
      age: Math.floor(Math.random() * 60) + 18,
      password: passwordHash,    
      role: pick(roles),         
      pets: []                    
    };
  });
}

module.exports = { generateUsers };
