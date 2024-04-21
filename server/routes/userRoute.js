const express = require('express');
const router = express.Router();

const {
  getCurrentInfo,
  createAdminWebShop,
} = require('../controllers/userController');

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');

router.get('/currentInfo', authenticateUser, getCurrentInfo);
router.post(
  '/create/AdminWebShop/?email',
  authenticateUser,
  authorizePermissions('ADMIN_ROOT'),
  createAdminWebShop
);

module.exports = router;
