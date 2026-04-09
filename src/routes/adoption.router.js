const express = require('express');
const router = express.Router();

const {
  getAllAdoptions,
  getAdoptionById,
  createAdoption,
  deleteAdoption,
} = require('../controllers/adoption.controller');

router.get('/', getAllAdoptions);
router.get('/:id', getAdoptionById);
router.post('/', createAdoption);
router.delete('/:id', deleteAdoption);

module.exports = router;