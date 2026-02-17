const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', async (_req, res, next) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json({ message: 'Listado de usuarios', users });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
