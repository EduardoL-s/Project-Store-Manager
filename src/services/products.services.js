const { productModel } = require('../models');

const findProducts = async () => {
  const result = await productModel.getAllProducts();
  return result;
};

const isValidIdProduct = async (id) => {
  const [productId] = await productModel.getProductById(id);

  if (!productId) {
    return { type: 'ID_NOT_FOUND', message: 'Product not found' };
  }

  return { type: null, message: productId };
};

const NewProduct = async (nameNewProduct) => {
  const result = await productModel.insertNewProduct(nameNewProduct);
  return { status: 201, newProduct: { id: result[0].insertId, name: nameNewProduct } };
};

const productForUpdate = async (idForUpdate, nameForUpdate) => {
  const updated = await productModel.updateProduct(idForUpdate, nameForUpdate);

  if (updated.affectedRows !== 1) {
    return { status: 404, message: { message: 'Product not found' } };
  }

  return { status: 200, message: { id: idForUpdate, name: nameForUpdate } };
};

const productForDelete = async (id) => {
  const [validationId] = await productModel.getProductById(id);

  if (validationId === undefined) {
    return { status: 404, message: { message: 'Product not found' } };
  }
  await productModel.deleteProduct(id);
  return { status: 204, message: null };
};

module.exports = {
  findProducts,
  isValidIdProduct,
  NewProduct,
  productForUpdate,
  productForDelete,
};