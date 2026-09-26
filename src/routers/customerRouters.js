const { Router } = require('express');

const CustomerController = require('../controllers/customerController');

////////////////////////////////////////////////////////////////////////

const router = new Router();

router
  .route('/')
  .get(CustomerController.getCustomers)
  .post(CustomerController.createCustomer)
  .put(CustomerController.updateCustomer);

router
  .route('/:customerId')
  .get(CustomerController.getCustomerById)
  .delete(CustomerController.deleteCustomer);

module.exports = router;
