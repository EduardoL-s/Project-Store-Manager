const { productService } = require('../services');

const findAllProducts = async (req, res) => {
  const products = await productService.findProducts();
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
  const newProduct = await productService.NewProduct(name);
  return res.status(newProduct.status).json(newProduct.newProduct);
};

const updateProduct = async (req, res) => {
  const { id: idParam } = req.params;
  const { name: nameBody } = req.body;
  const updated = await productService.productForUpdate(idParam, nameBody);

  return res.status(updated.status).json(updated.message);
};

const deleteOneProduct = async (req, res) => {
  const { id } = req.params;
  const product = await productService.productForDelete(+id);
  
  return res.status(product.status).json(product.message);
};

module.exports = {
  findAllProducts,
  findProductsById,
  insertProduct,
  updateProduct,
  deleteOneProduct,
};