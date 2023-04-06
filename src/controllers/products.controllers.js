const { productModel } = require('../models');
const { productService } = require('../services');

const findAllProducts = async (req, res) => {
  const products = await productModel.getAllProducts();
  return res.status(200).json(products);
};

const findProductsById = async (req, res) => {
  const { id } = req.params;
  const product = await productService.isValidIdProduct(+id);
  if (product.type) {
    return res.status(404).json({ message: product.message });
  }
  return res.status(200).json(product.message);
};

const insertProduct = async (req, res) => {
  const { name } = req.body;

  const newProduct = await productModel.insertNewProduct(name);
  return res.status(201).json({
    id: newProduct[0].insertId,
    name: req.body.name,
  });
};

const updateProduct = async (req, res) => {
  const { id: idParam } = req.params;
  const { name: nameBody } = req.body;
  const updated = await productService.productForUpdate(idParam, nameBody);
  if (updated.type) {
    return res.status(404).json({ message: updated.message });
  }

  return res.status(200).json({
    id: +idParam,
    name: nameBody,
  });
};

const deleteOneProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productService.isValidIdProduct(+id);
  if (product.type) {
    return res.status(404).json({ message: product.message });
  }
  await productModel.deleteProduct(id);
  return res.status(204).end();
};

module.exports = {
  findAllProducts,
  findProductsById,
  insertProduct,
  updateProduct,
  deleteOneProduct,
};