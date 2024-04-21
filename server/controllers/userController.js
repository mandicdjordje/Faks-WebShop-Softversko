const db = require('../models/index.js');

const getCurrentInfo = async (req, res) => {
  const userId = req.userId;

  const user = await db.korisnik.findOne({ where: { user_id: userId } });

  const body = {};

  if (user.role === 'ADMIN_ROOT') {
    body.admin_root = true;
  } else {
    body.admin_root = false;
  }

  if (user.role === 'ADMIN_WEB_SHOP') {
    body.admin_web_shop = true;
  } else {
    body.admin_web_shop = false;
  }

  res.status(200).json({ body });
};

module.exports = { getCurrentInfo };
