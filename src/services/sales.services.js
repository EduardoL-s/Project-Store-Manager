const { salesModel } = require('../models');

const isValidIdSale = async (id) => {
  const saleId = await salesModel.getSaleById(id);
  if (saleId.length === 0) {
    return { type: 'ID_NOT_FOUND', message: 'Sale not found' };
  }

  return { type: null, message: saleId };
};

module.exports = {
  isValidIdSale,
};