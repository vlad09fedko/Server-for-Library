const { Router } = require('express');

const BookController = require('../controllers/bookController');
const { validateBook } = require('../middleware/validate.mw');

const router = new Router();

router
  .route('/')
  .get(BookController.getBooks)
  .post(validateBook, BookController.createBook)
  .put(validateBook, BookController.updateBook);

router
  .route('/:bookId')
  .get(BookController.getBookById)
  .delete(BookController.deleteBook);

module.exports = router;
