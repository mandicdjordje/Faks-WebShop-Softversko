const db = require("../models/index");
const CustomError = require(`../errors/index.js`);
const StatusCodes = require("http-status-codes");
const { where } = require("sequelize");

const createBasket = async (req, res) => {
  const user_id = req.userId;
  const { ordered_products } = req.body;
  const price = req.body.price;
  console.log(ordered_products);
  const basket = await db.basket.create({
    korisnik_id: user_id,
    price: price,
    status: "Accepted",
  });

  ordered_products.forEach(async (basket_product) => {
    await db.basket_product.create({
      quantity: basket_product.quantity,
      product_id: basket_product.product_id,
      basket_id: basket.basket_id,
      productName: basket_product.productName,
      status: "Accepted",
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

const getUserBaskets = async (req, res) => {
  let user_id = req.userId;

  const baskets = await db.basket.findAll({
    where: {
      korisnik_id: user_id,
      status: "Accepted",
    },
  });

  res.status(200).json(baskets);
};
const getProductFromBasket = async (req, res) => {
  const basket_id = req.params.basket_id;
  console.log(basket_id);

  const products = await db.basket_product.findAll({
    where: { basket_id: basket_id },
  });

  if (products) {
    res.status(200).json({ products });
  } else {
    res.status(404).json({ message: "Nema proizvoda" });
  }
};
const deleteBasket = async (req, res) => {
  const { basket_id } = req.params;

  console.log(basket_id);
  await db.basket.update(
    {
      status: "Decline",
    },
    {
      where: {
        basket_id: basket_id,
      },
    }
  );

  let basket_products = await db.basket_product.findAll({
    where: {
      basket_id: basket_id,
    },
  });

  basket_products.forEach(async (bas_product) => {
    let product = await db.product.findOne({
      where: {
        product_id: bas_product.product_id,
      },
    });

    await db.product.update(
      {
        quantity: product.quantity + bas_product.quantity,
      },
      {
        where: {
          product_id: product.product_id,
        },
      }
    );

    await db.basket_product.update(
      { status: "Decline" },
      {
        where: {
          product_id: bas_product.basket_id,
        },
      }
    );
  });

  res.status(204).json();
};

module.exports = {
  createBasket,
  getUserBaskets,
  getProductFromBasket,
  deleteBasket,
};
