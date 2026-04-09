const Adoption = require('../models/adoption.model');
const User = require('../models/user.model');
const Pet = require('../models/pet.model');

const getAllAdoptions = async (_req, res, next) => {
  try {
    const adoptions = await Adoption.find()
      .populate('user')
      .populate('pet')
      .lean();

    res.json({
      message: 'Listado de adopciones',
      adoptions,
    });
  } catch (error) {
    next(error);
  }
};

const getAdoptionById = async (req, res, next) => {
  try {
    const adoption = await Adoption.findById(req.params.id)
      .populate('user')
      .populate('pet')
      .lean();

    if (!adoption) {
      return res.status(404).json({ message: 'Adopción no encontrada' });
    }

    res.json({
      message: 'Detalle de adopción',
      adoption,
    });
  } catch (error) {
    next(error);
  }
};

const createAdoption = async (req, res, next) => {
  try {
    const { userId, petId, status } = req.body ?? {};

    if (!userId || !petId) {
      return res.status(400).json({
        message: 'userId y petId son obligatorios',
      });
    }

    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    const pet = await Pet.findById(petId).lean();
    if (!pet) {
      return res.status(404).json({ message: 'Mascota no encontrada' });
    }

    const adoption = await Adoption.create({
      user: userId,
      pet: petId,
      status: status || 'pending',
    });

    const created = await Adoption.findById(adoption._id)
      .populate('user')
      .populate('pet')
      .lean();

    res.status(201).json({
      message: 'Adopción creada con éxito',
      adoption: created,
    });
  } catch (error) {
    next(error);
  }
};

const deleteAdoption = async (req, res, next) => {
  try {
    const adoption = await Adoption.findByIdAndDelete(req.params.id);

    if (!adoption) {
      return res.status(404).json({ message: 'Adopción no encontrada' });
    }

    res.json({
      message: 'Adopción eliminada correctamente',
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllAdoptions,
  getAdoptionById,
  createAdoption,
  deleteAdoption,
};