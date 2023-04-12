const { salesService } = require('../services');

const findAllSales = async (req, res) => {
  const sales = await salesService.findSales();
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

const deleteSaleById = async (req, res) => {
  const { id } = req.params;
  const sale = await salesService.findSaleForDelete(+id);
  return res.status(sale.status).json(sale.message);
};

const insertSale = async (req, res) => {
  const { body } = req;
  const sale = await salesService.insertSales(body);
  return res.status(sale.status).json(sale.message);
};

module.exports = {
  findAllSales,
  findSalesById,
  deleteSaleById,
  insertSale,
};