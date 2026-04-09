const EErrors = require('../services/errors/enums');

const errorHandler = (error, req, res, next) => {
  console.error('❌ Error capturado:', error);

  switch (error.code) {
    case EErrors.INVALID_TYPES_ERROR:
      return res.status(error.status || 400).json({
        status: 'error',
        error: error.message,
        cause: error.cause
      });

    case EErrors.NOT_FOUND_ERROR:
      return res.status(error.status || 404).json({
        status: 'error',
        error: error.message,
        cause: error.cause
      });

    case EErrors.AUTH_ERROR:
      return res.status(error.status || 401).json({
        status: 'error',
        error: error.message,
        cause: error.cause
      });

    case EErrors.FORBIDDEN_ERROR:
      return res.status(error.status || 403).json({
        status: 'error',
        error: error.message,
        cause: error.cause
      });

    case EErrors.DATABASE_ERROR:
      return res.status(error.status || 500).json({
        status: 'error',
        error: error.message,
        cause: error.cause
      });

    default:
      return res.status(error.status || 500).json({
        status: 'error',
        error: error.message || 'Error interno del servidor',
        cause: error.cause || 'Error no controlado'
      });
  }
};

module.exports = errorHandler;