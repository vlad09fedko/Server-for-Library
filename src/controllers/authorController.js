const db = require('../../db');

///////////////////////////////

class AuthorController {
  async getAuthors(req, res) {
    try {
      const authors = await db.query(`
        SELECT full_name, id 
        FROM authors
        `);
      res.json(authors.rows);
    } catch (error) {
      console.error(error.message);
    }
  }

  async getAuthorById(req, res) {
    try {
      const {
        params: { authorId },
      } = req;
      const author = await db.query(
        `
        SELECT full_name, id 
        FROM authors
        WHERE id = $1
        `,
        [authorId],
      );
      res.json(author.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  }

  async createAuthor(req, res) {
    try {
      const { full_name, email, nationality, createdAt, updatedAt } = req.body;
      const newAuthor = await db.query(
        `
        INSERT INTO authors
        (full_name, email, nationality_id, "createdAt", "updatedAt")
        VALUES
        ($1, $2, (
          SELECT id 
          FROM nationalities
          WHERE title = $3
        ), 
        $4, $5)
        RETURNING *
        `,
        [full_name, email, nationality, createdAt, updatedAt],
      );
      res.json(newAuthor.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  }

  async updateAuthor(req, res) {
    try {
      const { id, full_name, email, nationality, createdAt, updatedAt } =
        req.body;
      const updatedAuthor = await db.query(
        `
        UPDATE authors
        SET 
        full_name = $2, 
        email = $3, 
        nationality_id = (
          SELECT id
          FROM nationalities
          WHERE title = $4
        ), 
        "createdAt" = $5, 
        "updatedAt" = $6
        WHERE id = $1
        RETURNING *
        `,
        [id, full_name, email, nationality, createdAt, updatedAt],
      );
      res.json(updatedAuthor.rows[0]);
    } catch (error) {
      console.error(error.message);
    }
  }

  async deleteAuthor(req, res) {
    try {
      const {
        params: { authorId },
      } = req;
      const delAuthor = await db.query(
        `DELETE FROM authors
        WHERE id=$1
        RETURNING id`,
        [authorId],
      );
      if (delAuthor.rows.length > 0) {
        res.json(delAuthor.rows[0]);
      } else {
        res.status(404).send('Author not found');
      }
    } catch (error) {
      console.error(error.message);
    }
  }
}

module.exports = new AuthorController();
