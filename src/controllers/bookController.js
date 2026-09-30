const db = require('../../db');

class BookController {
  async getBooks(req, res, next) {
    try {
      const authors = await db.query(`
        SELECT title, id 
        FROM books
        `);
      res.json(authors.rows);
      next();
    } catch (error) {
      console.error(error.message);
    }
  }

  async getBookById(req, res, next) {
    try {
      const {
        params: { bookId },
      } = req;
      const book = await db.query(
        `
        SELECT title, id 
        FROM books
        WHERE id = $1
        `,
        [bookId],
      );
      res.json(book.rows[0]);
      next();
    } catch (error) {
      console.error(error.message);
    }
  }

  async createBook(req, res, next) {
    try {
      const { title, genre, shelf, description, createdAt, updatedAt, image } =
        req.body;
      const newBook = await db.query(
        `
        INSERT INTO books
        (title, genre_id, shelf_id, description, "createdAt", "updatedAt", image)
        VALUES
        ($1, (
          SELECT id
          FROM genres
          WHERE title = $2
        ), (
          SELECT id
          FROM shelves
          WHERE title = $3
        ), 
        $4, $5, $6, $7)
        RETURNING *
        `,
        [title, genre, shelf, description, createdAt, updatedAt, image],
      );
      res.json(newBook.rows[0]);
      next();
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateBook(req, res, next) {
    try {
      const {
        id,
        title,
        genre,
        shelf,
        description,
        createdAt,
        updatedAt,
        image,
      } = req.body;
      const updatedBook = await db.query(
        `
        UPDATE books
        SET
        title = $2,
        genre_id = (
          SELECT id
          FROM genres
          WHERE title = $3
        ),
        shelf_id = (
          SELECT id
          FROM shelves
          WHERE title = $4
        ),
        description = $5,
        "createdAt" = $6,
        "updatedAt" = $7,
        image = $8
        WHERE id = $1
        RETURNING *
        `,
        [id, title, genre, shelf, description, createdAt, updatedAt, image],
      );
      res.json(updatedBook.rows[0]);
      next();
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteBook(req, res, next) {
    try {
      const {
        params: { bookId },
      } = req;
      const delBook = await db.query(
        `DELETE FROM books
        WHERE id=$1
        RETURNING id`,
        [bookId],
      );
      if (delBook.rows.length > 0) {
        res.json(delBook.rows[0]);
      } else {
        res.status(404).send('Author not found');
      }
      next();
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = new BookController();
