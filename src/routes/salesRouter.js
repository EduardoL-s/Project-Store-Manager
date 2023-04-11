const { Router } = require('express');
const { salesControllers } = require('../controllers');

const salesRouter = Router();

salesRouter.get('/', salesControllers.findAllSales);

salesRouter.get('/:id', salesControllers.findSalesById);

salesRouter.delete('/:id', salesControllers.deleteSaleById);

// salesRouter.post('/', salesControllers.insertSale);

module.exports = salesRouter;