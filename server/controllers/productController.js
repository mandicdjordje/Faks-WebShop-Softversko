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

const getAllProduct = async (req, res) => {
  console.log(req.query.manda);
  const proizvodi = await db.product.findAll();

  res.status(201).json({ proizvodi });
};

const getProduct = async (req, res) => {
  const productName = req.params.productName;

  let product = await db.product.findOne({
    where: { productName: productName },
  });
  if (!product) {
    throw new CustomError.NotFoundError(
      `${productName} trenutno nema na raspolaganju`
    );
  }
  res.status(200).json({ product });
};
const updateProduct = async (req, res) => {
  let productId = req.params.product_id;
  let { productName, quantity, price } = req.body;

  let product = await db.product.findOne({ where: { product_id: productId } });

  await product.update({
    productName: productName,
    quantity: quantity,
    price: price,
  });

  res.status(200).json({ product });
};

const subtractProductsQuantity = async (req, res) => {
  const productID = req.params.product_id;
  const quantityBody = req.body.quantity;
  console.log(quantityBody);

  console.log(productID);
  const product = await db.product.findOne({
    where: { product_id: productID },
  });

  await product.update({
    quantity: product.quantity - quantityBody,
  });

  res.status(200).json({ product });
};

module.exports = {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  subtractProductsQuantity,
};
