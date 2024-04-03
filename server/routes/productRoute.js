const express = require('express');
const router = express.Router();

const { createProduct } = require('../controllers/productController');
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

module.exports = router;
