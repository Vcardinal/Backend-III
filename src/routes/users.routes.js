const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints de usuarios
 */

/**
 * @swagger
 * /api/users:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Lista de usuarios obtenida correctamente
 */
router.get('/', async (_req, res, next) => {
  try {
    const users = await User.find()
      .select('-password')
      .sort({ createdAt: -1 })
      .lean();

    res.json({
      message: 'Listado de usuarios',
      users,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Obtener un usuario por ID
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */
router.get('/:id', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
      .select('-password')
      .lean();

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.json({
      message: 'Detalle de usuario',
      user,
    });
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/users:
 *   post:
 *     summary: Crear un usuario
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 example: Juan
 *               last_name:
 *                 type: string
 *                 example: Pérez
 *               email:
 *                 type: string
 *                 example: juan@test.com
 *               age:
 *                 type: number
 *                 example: 25
 *               password:
 *                 type: string
 *                 example: coder123
 *               role:
 *                 type: string
 *                 example: user
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
 *       400:
 *         description: Faltan datos obligatorios
 */
router.post('/', async (req, res, next) => {
  try {
    const { first_name, last_name, email, age, password, role } = req.body ?? {};

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        message: 'first_name, last_name, email y password son obligatorios',
      });
    }

    const user = await User.create({
      first_name,
      last_name,
      email,
      age,
      password,
      role: role || 'user',
      pets: [],
    });

    res.status(201).json({
      message: 'Usuario creado con éxito',
      user,
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;