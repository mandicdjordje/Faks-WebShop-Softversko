const express = require("express");
const router = express.Router();

const {
  getCurrentInfo,
  createAdminWebShop,
  deleteAdminWebShop,
} = require("../controllers/userController");

const {
  authenticateUser,
  authorizePermissions,
} = require("../middleware/authentification");

router.get("/currentInfo", authenticateUser, getCurrentInfo);
router.post(
  "/create/AdminWebShop",
  authenticateUser,
  authorizePermissions("ADMIN_ROOT"),
  createAdminWebShop
);
router.delete(
  "/delete/AdminWebShop/:email",
  authenticateUser,
  authorizePermissions("ADMIN_ROOT"),
  deleteAdminWebShop
);
module.exports = router;
