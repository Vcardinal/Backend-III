require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');

const usersRoutes = require('./routes/users.routes');
const petsRoutes = require('./routes/pets.routes');
const mocksRoutes = require('./routes/mocks.routes');
const adoptionRoutes = require('./routes/adoption.router');

const { sessionMW } = require('./config/session');
const errorHandler = require('./middlewares/error.middleware');

const app = express();
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./docs/swagger');

app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(sessionMW());

app.get('/health', (_req, res) => res.json({ status: 'ok' }));

app.use('/api/users', usersRoutes);
app.use('/api/pets', petsRoutes);
app.use('/api/mocks', mocksRoutes);
app.use('/api/adoptions', adoptionRoutes);

app.use((req, res) => res.status(404).json({ message: 'Ruta no encontrada' }));

app.use(errorHandler);

module.exports = app;
