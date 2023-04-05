const { Router } = require('express');
const { getAllProducts, getProductById, insertNewProduct } = require('../models');

const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
  const products = await getAllProducts();
  return res.status(200).json(products);
});

productsRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const [product] = await getProductById(+id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  return res.status(200).json(product);
});

productsRouter.post('/', async (req, res) => {
  const { name } = req.body;

  const newProduct = await insertNewProduct(name);
  return res.status(201).json({
      id: newProduct[0].insertId,
      name: req.body.name,
    });
});

module.exports = productsRouter;