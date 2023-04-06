const connection = require('./connection');

const getAllProducts = async () => {
  const [result] = await connection.execute(`
  SELECT * FROM products ORDER BY id ASC`);
  return result;
};

const getProductById = async (id) => {
  const [result] = await connection.execute(`
  SELECT * FROM products WHERE id = ?`, [id]);
  return result;
};

const insertNewProduct = async (name) => {
  const result = await connection.execute(`
  INSERT INTO products (name) VALUES (?)`, [name]);
  return result;
};

const updateProduct = async (id, name) => {
  const [result] = await connection.execute(`
  UPDATE products
  SET name = ?
  WHERE id = ?`, [name, id]);
  return result;
};

const deleteProduct = async (id) => {
  const [result] = await connection.execute(`
  DELETE FROM products
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