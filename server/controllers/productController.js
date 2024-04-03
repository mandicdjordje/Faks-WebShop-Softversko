const db = require('../models/index');
const CustomError = require('../errors/index');
const StatusCodes = require('http-status-codes');

const createProduct = async (req, res) => {
  const { productName, quantity, price } = req.body;

  if (productName && quantity && price) {
    const proizvod = await db.product.create({
      productName: productName,
      quantity: quantity,
      price: price,
    });
    res.status(201).json({ success: true });
  } else {
    throw new CustomError.BadRequestError('Unesi Sve Podatke');
  }
};

module.exports = { createProduct };
