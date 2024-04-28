const { where } = require("sequelize");
const db = require("../models/index.js");

const getCurrentInfo = async (req, res) => {
  const userId = req.userId;

  const user = await db.korisnik.findOne({ where: { user_id: userId } });

  const body = {};

  if (user.role === "ADMIN_ROOT") {
    body.admin_root = true;
  } else {
    body.admin_root = false;
  }

  if (user.role === "ADMIN_WEB_SHOP") {
    body.admin_web_shop = true;
  } else {
    body.admin_web_shop = false;
  }

  res.status(200).json({ body });
};

const createAdminWebShop = async (req, res) => {
  const email = req.body.email;

  const user = await db.korisnik.findOne({ where: { email: email } });

  if (!user) {
    res.status(400).json({ err: "User nije nadjen" });
  }

  const userZaUpdate = await db.korisnik.update(
    { role: "ADMIN_WEB_SHOP" },
    { where: { email: email } }
  );

  res.status(200).json({ success: true });
};

const deleteAdminWebShop = async (req, res) => {
  const { email } = req.params;
  console.log(email);
  if (!email) {
    throw new Error("Prosledi email");
  }

  const user = await db.korisnik.findOne({ where: { email: email } });
  if (!user) {
    res.status(406).json("User ne postoji");
  }

  if (user.role === "ADMIN_WEB_SHOP" || user.role === "USER") {
    await db.korisnik.update({ role: "USER" }, { where: { email: email } });
    res.status(200).json({ success: true });
  } else {
    res.status(400).json({ success: false });
  }
};

module.exports = { getCurrentInfo, createAdminWebShop, deleteAdminWebShop };
