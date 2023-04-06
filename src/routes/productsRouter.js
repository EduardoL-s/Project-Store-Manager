const { Router } = require('express');
const {
  getAllProducts,
  getProductById,
  insertNewProduct,
  updateProduct,
  deleteProduct,
} = require('../models');
const { nameProductValidation } = require('../middlewares');

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

productsRouter.post('/', nameProductValidation, async (req, res) => {
  const { name } = req.body;

  const newProduct = await insertNewProduct(name);
  return res.status(201).json({
      id: newProduct[0].insertId,
      name: req.body.name,
    });
});

productsRouter.put('/:id', nameProductValidation, async (req, res) => {
  const { id: idParam } = req.params;
  const { name: nameBody } = req.body;
  const updated = await updateProduct(idParam, nameBody);

  if (updated.affectedRows !== 1) {
    return res.status(404).json({ message: 'Product not found' });
  }

  return res.status(200).json({
    id: +idParam,
    name: nameBody,
  });
});

productsRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const [product] = await getProductById(+id);
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  await deleteProduct(id);
  return res.status(204).end();
});

module.exports = productsRouter;