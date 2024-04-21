const express = require('express');
const router = express.Router();

const { getCurrentInfo } = require('../controllers/userController');

const {
  authenticateUser,
  authorizePermissions,
} = require('../middleware/authentification');

router.get('/currentInfo', authenticateUser, getCurrentInfo);

module.exports = router;
