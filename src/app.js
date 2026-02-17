const express = require('express');

const usersRoutes = require('./routes/users.routes');
const petsRoutes = require('./routes/pets.routes');
const mocksRoutes = require('./routes/mocks.routes');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/users', usersRoutes);
app.use('/api/pets', petsRoutes);
app.use('/api/mocks', mocksRoutes);

app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));

module.exports = app;
