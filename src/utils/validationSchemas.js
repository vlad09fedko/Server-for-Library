const yup = require('yup');

module.exports.BOOK_VALIDATION_SCHEMA = yup.object().shape({
  title: yup.string().min(1).max(255).trim(),
  genre: yup.string().min(3).required(),
  shelf: yup.string().min(7).required(),
  description: yup.string().trim(),
  createdAt: yup.date(),
  updatedAt: yup.date(),
  image: yup.string(),
});

module.exports.AUTHOR_VALIDATION_SCHEMA = yup.object().shape({
  full_name: yup.string().min(3).max(255).trim().required(),
  email: yup.string().email().required(),
  nationality: yup.string().min(3),
  createdAt: yup.date(),
  updatedAt: yup.date(),
});

module.exports.CUSTOMER_VALIDATION_SCHEMA = yup.object().shape({
  full_name: yup.string().min(3).max(255).trim(),
  email: yup.string().email(),
  phone: yup.string().min(10), // no validation for ease of checking
  createdAt: yup.date(),
  updatedAt: yup.date(),
  password: yup.string().trim().required(),
});
