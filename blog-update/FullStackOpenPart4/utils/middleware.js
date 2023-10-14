const logger = require('./logger');

const jwt = require('jsonwebtoken');

const decodeAndVerifyToken = (token) => {
  //Decode token, returns null if not valid
  const decodedToken = jwt.verify(token, process.env.SECRET);

  //Check validity of token
  if (!token || !decodedToken.id) {
      return null
    };

  return decodedToken;
};

const requestLogger = (request, response, next) => {
  logger.info('Method:', request.method);
  logger.info('Path:  ', request.path);
  logger.info('Body:  ', request.body);
  logger.info('---');
  next();
};


const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }
  else(request.token = null);
  next();
};

const userExtractor = (request, response, next) => {
  if (request.token) {
    request.token = decodeAndVerifyToken(request.token);
    request.userId = request.token.id;
  };
  next();
};

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};


const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'invalid token'
    });
  };

  next(error);
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
  tokenExtractor,
  userExtractor
}