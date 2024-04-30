const express = require('express');
const router = express.Router();

const {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  subtractProductsQuantity,
  deleteProduct,
  getProductsFromProductName,
} = require('../controllers/productController');
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');

router.post(
  '/create',
  authenticateUser,
  authorizePermissions('ADMIN_ROOT', 'ADMIN_SHOP'),
  createProduct
);

router.put(
  '/update/:product_id',
  authenticateUser,
  authorizePermissions('ADMIN_ROOT', 'ADMIN_SHOP'),
  updateProduct
);

router.get('/all', getAllProduct);

router.get(
  '/:productName',
  authenticateUser,
  authorizePermissions('ADMIN_ROOT', 'ADMIN_WEB_SHOP'),
  getProductsFromProductName
);

router.post('/:product_id/subtract/quantity', subtractProductsQuantity);

router.delete(
  '/delete/:productId',
  authenticateUser,
  authorizePermissions('ADMIN_ROOT', 'ADMIN_WEB_SHOP'),
  deleteProduct
);

module.exports = router;
