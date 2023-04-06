const { productModel } = require('../models');

const isValidIdProduct = async (id) => {
  const [productId] = await productModel.getProductById(id);
  console.log(productId);

  if (!productId) {
    return { type: 'ID_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: productId };
};

const productForUpdate = async (id, name) => {
  const updated = await productModel.updateProduct(id, name);

  if (updated.affectedRows !== 1) {
    return { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null };
};

module.exports = {
  isValidIdProduct,
  productForUpdate,
};