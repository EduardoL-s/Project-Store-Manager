const { salesModel } = require('../models');

const isValidIdSale = async (id) => {
  const saleId = await salesModel.getSaleById(id);
  if (saleId.length === 0) {
    return { type: 'ID_NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: saleId };
};

const findSales = async () => {
  const sales = await salesModel.getAllSales();
  return sales;
};

const findSaleForDelete = async (idForDelete) => {
  const saleId = await salesModel.deleteSale(idForDelete);
  if (saleId.affectedRows !== 1) {
    return { status: 404, message: { message: 'Sale not found' } };
  }

  return { status: 204, message: null };
};

module.exports = {
  findSales,
  isValidIdSale,
  findSaleForDelete,
};