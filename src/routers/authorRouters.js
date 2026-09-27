const { Router } = require('express');

const AuthorController = require('../controllers/authorController');
const { validateAuthor } = require('../middleware/validate.mw');

const router = new Router();

router
  .route('/')
  .get(AuthorController.getAuthors)
  .post(validateAuthor, AuthorController.createAuthor)
  .put(validateAuthor, AuthorController.updateAuthor);

router
  .route('/:authorId')
  .get(AuthorController.getAuthorById)
  .delete(AuthorController.deleteAuthor);

module.exports = router;
