const {
  getAllProducts,
  getProductById,
  insertNewProduct,
  updateProduct,
} = require('./products.models');

const { getAllSales, getSaleById } = require('./sales.models');

module.exports = {
  getAllProducts,
  getProductById,
  insertNewProduct,
  getAllSales,
  getSaleById,
  updateProduct,
};