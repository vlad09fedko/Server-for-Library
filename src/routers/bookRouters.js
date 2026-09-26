const { Router } = require('express');

const BookController = require('../controllers/bookController');

////////////////////////////////////////////////////////////////

const router = new Router();

router
  .route('/')
  .get(BookController.getBooks)
  .post(BookController.createBook)
  .put(BookController.updateBook);

router
  .route('/:bookId')
  .get(BookController.getBookById)
  .delete(BookController.deleteBook);

module.exports = router;
