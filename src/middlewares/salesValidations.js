const newSalesValidations = (req, res, next) => {
  const { body } = req;

  const notProductId = body.some((register) => !register.productId);
  if (notProductId) {
    return res.status(400).json({ message: '"productId" is required' });
  }

  const quantitySales = body.some((register) => register.quantity <= 0);
  if (quantitySales) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }

  const notQuantity = body.some((register) => !register.quantity);
  if (notQuantity) {
    return res.status(400).json({ message: '"quantity" is required' });
  }

  next();
};

module.exports = { newSalesValidations };