const express = require('express');
const router = express.Router();
const Pet = require('../models/pet.model');

// GET /api/pets → listar todas las mascotas
router.get('/', async (_req, res, next) => {
  try {
    const pets = await Pet.find().lean();

    res.json({
      message: 'Listado de mascotas',
      pets,
    });
  } catch (error) {
    next(error);
  }
});

// GET /api/pets/:id → obtener una mascota por ID
router.get('/:id', async (req, res, next) => {
  try {
    const pet = await Pet.findById(req.params.id).lean();

    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    res.json({
      message: 'Detalle de mascota',
      pet,
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/pets → crear una mascota
router.post('/', async (req, res, next) => {
  try {
    const { name, species, age, owner } = req.body ?? {};

    if (!name || !species) {
      return res.status(400).json({
        message: 'name y species son obligatorios',
      });
    }

    const pet = await Pet.create({
      name,
      species,
      age,
      owner: owner || null,
    });

    res.status(201).json({
      message: 'Mascota creada con éxito',
      pet,
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
