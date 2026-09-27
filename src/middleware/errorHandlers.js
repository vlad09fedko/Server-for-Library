const { ValidationError } = require('yup');

module.exports.validationErrorHandler = (error, req, res, next) => {
  if (error instanceof ValidationError) {
    return res
      .status(500)
      .send({ errors: [{ title: 'Validation error', details: error.errors }] });
  }
  console.error(error.message);
  next(error);
};

module.exports.errorHandler = (error, req, res, next) => {
  if (res.headersSent) return null;
  res
    .status(error?.status ?? 500)
    .send({ errors: [{ title: error?.message ?? 'Internal server error' }] });
  console.error(error.message);
};
