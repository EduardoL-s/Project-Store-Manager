const { Router } = require('express');
const { getAllSales, getSaleById } = require('../models');

const salesRouter = Router();

salesRouter.get('/', async (req, res) => {
  const sales = await getAllSales();
  res.status(200).json(sales);
});

salesRouter.get('/:id', async (req, res) => {
  const { id } = req.params;
  const product = await getSaleById(+id);
  if (product.length === 0) {
    return res.status(404).json({ message: 'Sale not found' });
  }
  return res.status(200).json(product);
});

module.exports = salesRouter;