const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');

const {
  createBasket,
  deleteBasket,
} = require('../controllers/basketController');

router.post(
  '/create',
  authenticateUser,
  authorizePermissions('ADMIN_ROOT', 'ADMIN_SHOP', 'USER'),
  createBasket
);

router.delete(
  '/delete/:basket_id',
  authenticateUser,
  authorizePermissions('ADMIN_ROOT', 'ADMIN_SHOP', 'USER'),
  deleteBasket
);

module.exports = router;
