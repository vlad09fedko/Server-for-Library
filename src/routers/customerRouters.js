const { Router } = require('express');

const CustomerController = require('../controllers/customerController');
const { validateCustomer } = require('../middleware/validate.mw');

const router = new Router();

router
  .route('/')
  .get(CustomerController.getCustomers)
  .post(validateCustomer, CustomerController.createCustomer)
  .put(validateCustomer, CustomerController.updateCustomer);

router
  .route('/:customerId')
  .get(CustomerController.getCustomerById)
  .delete(CustomerController.deleteCustomer);

module.exports = router;
