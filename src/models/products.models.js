const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(`
  SELECT * FROM StoreManager.products ORDER BY id ASC`);
  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.execute(`
  SELECT * FROM StoreManager.products WHERE id = ?`, [id]);
  console.log('test', result);
  return result;
};

const insertNewProduct = async (name) => {
  const result = await connection.execute(`
  INSERT INTO StoreManager.products (name) VALUES (?)`, [name]);
  return result;
};

const updateProduct = async (id, name) => {
  const [result] = await connection.execute(`
  UPDATE StoreManager.products
  SET name = ?
  WHERE id = ?`, [name, id]);
  console.log('teste', result);
  return result;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(`
  DELETE FROM StoreManager.products
  WHERE id = ?`, [id]);
  return result;
};

module.exports = {
  getAllProducts,
  getProductById,
  insertNewProduct,
  updateProduct,
  deleteProduct,
};