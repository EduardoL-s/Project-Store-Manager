const { Router } = require('express');
const { salesControllers } = require('../controllers');
const { newSalesValidations } = require('../middlewares');

const salesRouter = Router();

salesRouter.get('/', salesControllers.findAllSales);

salesRouter.get('/:id', salesControllers.findSalesById);

salesRouter.delete('/:id', salesControllers.deleteSaleById);

salesRouter.post('/', newSalesValidations, salesControllers.insertSale);

salesRouter.put('/:id', newSalesValidations, salesControllers.updateSales);

module.exports = salesRouter;