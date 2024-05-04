const express = require("express");
const router = express.Router();
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentification");

const {
  createBasket,
  getProductFromBasket,
  deleteBasket,
  getUserBaskets,
} = require("../controllers/basketController");

router.get(
  `/basket_id/:basket_id`,
  authenticateUser,
  authorizePermissions("ADMIN_ROOT", "ADMIN_SHOP", "USER"),
  getProductFromBasket
);

router.post(
  "/create",
  authenticateUser,
  authorizePermissions("ADMIN_ROOT", "ADMIN_SHOP", "USER"),
  createBasket
);
router.get(
  "/all",
  authenticateUser,
  authorizePermissions("ADMIN_ROOT", "ADMIN_SHOP", "USER"),
  getUserBaskets
);
router.delete(
  "/delete/:basket_id",
  authenticateUser,
  authorizePermissions("ADMIN_ROOT", "ADMIN_SHOP", "USER"),
  deleteBasket
);

module.exports = router;
