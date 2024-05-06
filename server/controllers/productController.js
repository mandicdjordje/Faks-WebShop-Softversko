const db = require("../models/index");
const CustomError = require("../errors/index");
const StatusCodes = require("http-status-codes");
const { Op } = require("sequelize");
const createProduct = async (req, res) => {
  const { productName, quantity, price } = req.body;

  const nazivProizvoda = await db.product.findOne({
    where: { productName: productName },
  });

  if (nazivProizvoda) {
    res.status(406).json({ success: false });
  }

  if (productName && quantity && price) {
    const proizvod = await db.product.create({
      productName: productName,
      quantity: quantity,
      price: price,
    });
    res.status(201).json({ success: true });
  } else {
    res.status(400).json("Nije dobro");
    throw new CustomError.BadRequestError("Unesi Sve Podatke");
  }
};

const getAllProduct = async (req, res) => {
  const proizvodi = await db.product.findAll();

  res.status(201).json({ proizvodi });
};

const getProductFromId = async (req, res) => {
  const product_id = req.params.product_id;

  let product = await db.product.findOne({
    where: { product_id: product_id },
  });

  if (!product) {
    res.status(404).json({ message: `Nema Produkta sa id_${product_id}` });
  }
  res.status(200).json({ product });
};

const getProductsFromProductName = async (req, res) => {
  const productName = req.params.productName;

  console.log(productName);
  const products = await db.product.findAll({
    where: {
      productName: { [Op.like]: `%${productName}%` },
    },
  });

  if (products.length == 0) {
    res.status(404).json({ message: "Nema proizvoda" });
  }
  res.status(200).json({ products });
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

// DELETE PRODUCT SA IMENOM TRENUTNO NE TREBA
// const deleteProduct = async (req, res) => {
//   const productName = req.params.productName;

//   const product = await db.product.findOne({
//     where: { productName: productName },
//   });
//   console.log(product);
//   if (product) {
//     await product.destroy();
//     res.status(204).send();
//   } else {
//     res.status(404).json({
//       message: 'proizvod nije pronadjen',
//     });
//   }
// };

const deleteProduct = async (req, res) => {
  const productId = req.params.productId;

  const product = await db.product.findOne({
    where: { product_id: productId },
  });
  if (product) {
    await product.destroy();
    res.status(204).send();
  } else {
    res.status(404).json({
      message: "proizvod nije pronadjen",
    });
  }
};

module.exports = {
  createProduct,
  getProductFromId,
  getAllProduct,
  updateProduct,
  subtractProductsQuantity,
  deleteProduct,
  getProductsFromProductName,
};
