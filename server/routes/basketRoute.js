const express = require('express');
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');

const { createBasket } = require('../controllers/basketController');

router.post(
  '/create',
  authenticateUser,
  authorizePermissions('ADMIN_ROOT', 'ADMIN_SHOP'),
  createBasket
);

module.exports = router;

