const { Router } = require('express');
const { nameProductValidation } = require('../middlewares');
const { productsControllers } = require('../controllers');

const productsRouter = Router();

productsRouter.get('/', productsControllers.findAllProducts);

productsRouter.get('/:id', productsControllers.findProductsById);

productsRouter.post('/', nameProductValidation, productsControllers.insertProduct);

productsRouter.put('/:id', nameProductValidation, productsControllers.updateProduct);

productsRouter.delete('/:id', productsControllers.deleteOneProduct);

module.exports = productsRouter;