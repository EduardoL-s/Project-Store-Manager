const { salesModel, productModel } = require('../models');

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

const insertSales = async (body) => {
  const validationProductId = await Promise.all(body
    .map((register) => productModel.getProductById(register.productId)));
  
  const noProductId = validationProductId.some((register) => !register.length);
  
  if (noProductId) {
    return { status: 404, message: { message: 'Product not found' } };
  }

  const [saleDate] = await salesModel.insertNewDate();
  const saleId = saleDate.insertId;

  await Promise.all(body
      .map((register) => salesModel.insertNewSale(saleId, register.productId, register.quantity)));

  return { status: 201, message: { id: saleId, itemsSold: body } };
};

module.exports = {
  findSales,
  isValidIdSale,
  findSaleForDelete,
  insertSales,
};