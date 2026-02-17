const express = require('express');
const router = express.Router();

const User = require('../models/user.model');
const Pet = require('../models/pet.model');

const { generateUsers } = require('../mocking/users.mock');
const { generatePets } = require('../mocking/pets.mock'); 

router.get('/mockingusers', async (req, res, next) => {
  try {
    const n = req.query.n ?? 50;
    const users = await generateUsers(n);

    res.json({
      message: 'Mocking users',
      users,
    });
  } catch (err) {
    next(err);
  }
});

router.get('/mockingpets', async (_req, res, next) => {
  try {
    const pets = typeof generatePets === 'function' ? await generatePets(100) : [];

    res.json({
      message: 'Mocking pets',
      pets,
    });
  } catch (err) {
    next(err);
  }
});

router.post('/generateData', async (req, res, next) => {
  try {
    const usersCount = Number(req.body.users) || 0;
    const petsCount = Number(req.body.pets) || 0;

    if (usersCount < 0 || petsCount < 0) {
      return res.status(400).json({ message: 'users y pets deben ser números >= 0' });
    }

    const mockUsers = usersCount ? await generateUsers(usersCount) : [];
    const mockPets = (petsCount && typeof generatePets === 'function')
      ? await generatePets(petsCount)
      : [];

   
    const insertedUsers = mockUsers.length ? await User.insertMany(mockUsers) : [];
    const insertedPets = mockPets.length ? await Pet.insertMany(mockPets) : [];

    res.status(201).json({
      message: 'Datos generados e insertados',
      inserted: {
        users: insertedUsers.length,
        pets: insertedPets.length,
      },
    
      users: insertedUsers,
      pets: insertedPets,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;

