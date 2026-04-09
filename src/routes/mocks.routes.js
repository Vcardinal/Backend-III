const express = require('express');
const router = express.Router();

const User = require('../models/user.model');
const Pet = require('../models/pet.model');

const { generateUsers } = require('../mocking/users.mock');
const { generatePets } = require('../mocking/pets.mock');

// GET /api/mocks/mockingusers?n=50
router.get('/mockingusers', async (req, res, next) => {
  try {
    const n = Number(req.query.n) || 50;
    const users = await generateUsers(n);

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

    res.json({
      message: 'Mocking users',
      total: users.length,
      users,
    });
  } catch (err) {
    next(err);
  }
});

// GET /api/mocks/mockingpets?n=100
router.get('/mockingpets', async (req, res, next) => {
  try {
    const n = Number(req.query.n) || 100;
    const pets = typeof generatePets === 'function' ? await generatePets(n) : [];

    console.log(`✅ Mock pets generados: ${pets.length}`);
    if (pets.length > 0) {
      console.log('🧪 Ejemplo pet mock:', pets[0]);
    }

    res.json({
      message: 'Mocking pets',
      total: pets.length,
      pets,
    });
  } catch (err) {
    next(err);
  }
});

// POST /api/mocks/generateData
router.post('/generateData', async (req, res, next) => {
  try {
    const { users = 0, pets = 0 } = req.body || {};

    const usersCount = Number(users) || 0;
    const petsCount = Number(pets) || 0;

    if (usersCount < 0 || petsCount < 0) {
      return res.status(400).json({
        message: 'users y pets deben ser números >= 0',
      });
    }

    const mockUsers = usersCount > 0 ? await generateUsers(usersCount) : [];
    const mockPets =
      petsCount > 0 && typeof generatePets === 'function'
        ? await generatePets(petsCount)
        : [];

    console.log(`📦 Usuarios preparados para insertar: ${mockUsers.length}`);
    console.log(`📦 Mascotas preparadas para insertar: ${mockPets.length}`);

    if (mockUsers.length > 0) {
      console.log('🧪 Primer user antes de insertar:', {
        first_name: mockUsers[0].first_name,
        last_name: mockUsers[0].last_name,
        email: mockUsers[0].email,
        age: mockUsers[0].age,
        role: mockUsers[0].role,
      });
    }

    if (mockPets.length > 0) {
      console.log('🧪 Primer pet antes de insertar:', mockPets[0]);
    }

    const insertedUsers = mockUsers.length > 0 ? await User.insertMany(mockUsers) : [];
    const insertedPets = mockPets.length > 0 ? await Pet.insertMany(mockPets) : [];

    console.log(`✅ Usuarios insertados: ${insertedUsers.length}`);
    console.log(`✅ Mascotas insertadas: ${insertedPets.length}`);

    res.status(201).json({
      message: 'Datos generados e insertados',
      inserted: {
        users: insertedUsers.length,
        pets: insertedPets.length,
      },
      preview: {
        user: insertedUsers[0] || null,
        pet: insertedPets[0] || null,
      },
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;