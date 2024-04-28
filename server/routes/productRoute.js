const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProduct,
  getAllProduct,
  updateProduct,
  subtractProductsQuantity,
} = require("../controllers/productController");
const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentification");

router.post(
  "/create",
  authenticateUser,
  authorizePermissions("ADMIN_ROOT", "ADMIN_SHOP"),
  createProduct
);

router.put(
  "/update/:product_id",
  authenticateUser,
  authorizePermissions("ADMIN_ROOT", "ADMIN_SHOP"),
  updateProduct
);

router.get("/all", getAllProduct);

router.get("/:productName", getProduct);

router.post("/:product_id/subtract/quantity", subtractProductsQuantity);

module.exports = router;
