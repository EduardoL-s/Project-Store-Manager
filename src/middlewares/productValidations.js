const nameProductValidation = (req, res, next) => {
  if (!req.body.name) {
    return res.status(400).json({ message: '"name" is required' });
  }

  if (req.body.name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }

  next();
};

module.exports = { nameProductValidation };