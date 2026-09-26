const { Router } = require('express');

const bookRouters = require('./bookRouters');
const authorRouters = require('./authorRouters');
const customerRouters = require('./customerRouters');

/////////////////////////////////////////////////////

const router = new Router();

router.use('/books', bookRouters);
router.use('/authors', authorRouters);
router.use('/customers', customerRouters);

module.exports = router;
