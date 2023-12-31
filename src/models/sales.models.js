const connection = require('./connection');

const getAllSales = async () => {
  const [result] = await connection.execute(`
  SELECT sales.id AS saleId, sales.date, sales_products.product_id
  AS productId, sales_products.quantity
  FROM StoreManager.sales
  INNER JOIN StoreManager.sales_products
  ON sales.id = sales_products.sale_id
  ORDER BY saleId ASC, productId ASC`);
  return result;
};

const getSaleById = async (id) => {
  const [result] = await connection.execute(`
  SELECT sales.date, sales_products.product_id
  AS productId, sales_products.quantity
  FROM StoreManager.sales
  INNER JOIN StoreManager.sales_products
  ON sales.id = sales_products.sale_id
  WHERE sales.id = ?`, [id]);
  return result;
};

const deleteSale = async (id) => {
  const [result] = await connection.execute(`
  DELETE FROM StoreManager.sales
  WHERE id = ?`, [id]);
  return result;
};

const insertNewDate = async () => {
  const result = await connection.execute(`
  INSERT INTO StoreManager.sales (date) VALUES(NOW())`);
  return result;
};

const insertNewSale = async (saleId, productId, quantity) => {
  const result = await connection.execute(`
  INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)
  `, [saleId, productId, quantity]);
  return result;
};

const updateSale = async (quantity, saleId, productId) => {
  const [result] = await connection.execute(`
  UPDATE StoreManager.sales_products
  SET quantity = ?
  WHERE sale_id = ? AND product_id = ?
  `, [quantity, saleId, productId]);
  return result;
};

module.exports = {
  getAllSales,
  getSaleById,
  deleteSale,
  insertNewDate,
  insertNewSale,
  updateSale,
};