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

module.exports = {
  getAllSales,
  getSaleById,
};