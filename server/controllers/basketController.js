const db = require('../models/index');
const CustomError = require(`../errors/index.js`);
const StatusCodes = require('http-status-codes');

const createBasket = async (req, res) => {
  const user_id = req.userId;

  const basket = await db.basket.create({
    user_id: user_id,
  });

  res.status(201).json(basket);
};

module.exports = { createBasket };
