const { salesModel } = require('../models');
const { salesService } = require('../services');

const findAllSales = async (req, res) => {
  const sales = await salesModel.getAllSales();
  res.status(200).json(sales);
};

const findSalesById = async (req, res) => {
  const { id } = req.params;
  const product = await salesService.isValidIdSale(+id);
  if (product.type) {
    return res.status(404).json({ message: product.message });
  }
  return res.status(200).json(product.message);
};

module.exports = {
  findAllSales,
  findSalesById,
};