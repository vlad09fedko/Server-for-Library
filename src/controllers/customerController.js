const db = require('../../db');

class CustomerController {
  async getCustomers(req, res, next) {
    try {
      const customers = await db.query(`
        SELECT full_name, id 
        FROM customers
        `);
      res.json(customers.rows);
    } catch (error) {
      next(error);
    }
  }

  async getCustomerById(req, res, next) {
    try {
      const {
        params: { customerId },
      } = req;
      const customer = await db.query(
        `
        SELECT full_name, id 
        FROM customers
        WHERE id = $1
        `,
        [customerId],
      );
      res.json(customer.rows[0]);
    } catch (error) {
      next(error);
    }
  }

  async createCustomer(req, res, next) {
    try {
      const { full_name, email, phone, createdAt, updatedAt, password } =
        req.body;
      const newCustomer = await db.query(
        `
        INSERT INTO customers
        (full_name, email, phone, "createdAt", "updatedAt", password)
        VALUES
        ($1, $2, $3, $4, $5, $6)
        RETURNING *
        `,
        [full_name, email, phone, createdAt, updatedAt, password],
      );
      res.json(newCustomer.rows[0]);
    } catch (error) {
      next(error);
    }
  }

  async updateCustomer(req, res, next) {
    try {
      const { id, full_name, email, phone, createdAt, updatedAt, password } =
        req.body;
      const updatedCustomer = await db.query(
        `
        UPDATE customers
        SET 
        full_name = $2, 
        email = $3, 
        phone = $4, 
        "createdAt" = $5, 
        "updatedAt" = $6, 
        password = $7
        WHERE id = $1
        RETURNING *
        `,
        [id, full_name, email, phone, createdAt, updatedAt, password],
      );
      res.json(updatedCustomer.rows[0]);
    } catch (error) {
      next(error);
    }
  }

  async deleteCustomer(req, res, next) {
    try {
      const {
        params: { customerId },
      } = req;
      const delCustomer = await db.query(
        `DELETE FROM customers
        WHERE id=$1
        RETURNING id`,
        [customerId],
      );
      if (delCustomer.rows.length > 0) {
        res.json(delCustomer.rows[0]);
      } else {
        res.status(404).send('Customer not found');
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new CustomerController();
