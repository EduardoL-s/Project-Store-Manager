const { Router } = require('express');
const { salesControllers } = require('../controllers');

const salesRouter = Router();

salesRouter.get('/', salesControllers.findAllSales);

salesRouter.get('/:id', salesControllers.findSalesById);

module.exports = salesRouter;