const { Router } = require('express');

const AuthorController = require('../controllers/authorController');

////////////////////////////////////////////////////////////////////

const router = new Router();

router
  .route('/')
  .get(AuthorController.getAuthors)
  .post(AuthorController.createAuthor)
  .put(AuthorController.updateAuthor);

router
  .route('/:authorId')
  .get(AuthorController.getAuthorById)
  .delete(AuthorController.deleteAuthor);
  

module.exports = router;
