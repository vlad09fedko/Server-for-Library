const {
  BOOK_VALIDATION_SCHEMA,
  AUTHOR_VALIDATION_SCHEMA,
  CUSTOMER_VALIDATION_SCHEMA,
} = require('../utils/validationSchemas');

module.exports.validateBook = async (req, res, next) => {
  try {
    const validatedBody = await BOOK_VALIDATION_SCHEMA.validate(req.body);
    req.body = validatedBody;
    next();
  } catch (error) {
    next(`Error is ${error.errors}`);
  }
};

module.exports.validateAuthor = async (req, res, next) => {
  try {
    const validatedBody = await AUTHOR_VALIDATION_SCHEMA.validate(req.body);
    req.body = validatedBody;
    next();
  } catch (error) {
    next(`Error is ${error.errors}`);
  }
};

module.exports.validateCustomer = async (req, res, next) => {
  try {
    const validatedBody = await CUSTOMER_VALIDATION_SCHEMA.validate(req.body);
    req.body = validatedBody;
    next();
  } catch (error) {
    next(`Error is ${error.errors}`);
  }
};
