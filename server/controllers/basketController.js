const db = require('../models/index');
const CustomError = require(`../errors/index.js`);
const StatusCodes = require('http-status-codes');
const { where } = require('sequelize');

const createBasket = async (req, res) => {
  const user_id = req.userId;
  const { ordered_products } = req.body;

  const basket = await db.basket.create({
    korisnik_id: user_id,
    status: 'Accepted',
  });

  ordered_products.forEach(async (basket_product) => {
    await db.basket_product.create({
      quantity: basket_product.quantity,
      product_id: basket_product.product_id,
      basket_id: basket.basket_id,
      status: 'Accepted',
    });

    let product = await db.product.findOne({
      where: { product_id: basket_product.product_id },
    });

    await db.product.update(
      { quantity: product.quantity - basket_product.quantity },
      {
        where: {
          product_id: basket_product.product_id,
        },
      }
    );
  });

  res.status(201).json(basket);
};

const deleteBasket = async (req, res) => {
  const { basket_id } = req.params;

  console.log(basket_id);
  await db.basket.update(
    {
      status: 'Decline',
    },
    {
      where: {
        basket_id: basket_id,
      },
    }
  );

  let basket_product = await db.basket_product.findAll({
    where: {
      basket_id: basket_id,
    },
  });

  await db.product.update({where:{

    


  }})

  console.log(basket_product);

  res.status(204).json({ success: true });
};

module.exports = { createBasket, deleteBasket };
