const { Sequelize, DataTypes, Op } = require('sequelize');
const bcrypt = require('bcrypt');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    dialect: 'mysql',
  }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

sequelize
  .authenticate()
  .then(() => {
    console.log('connected..');
  })
  .catch((err) => {
    console.log('Error' + err);
  });

// MODLELI
db.korisnik = require('./UserModel')(sequelize, DataTypes);
db.product = require('./ProductModel')(sequelize, DataTypes);
db.basket = require('./BasketModel')(sequelize, DataTypes);
db.basket_product = require('./Basket-ProductModel')(sequelize, DataTypes);

db.sequelize
  .sync()
  .then((data) => {
    console.log(`Table and model sync successfully`);
  })
  .catch((err) => {
    console.log('Error syncing the table and model');
  });

db.korisnik.prototype.encryptPassword = async function (canditatePassword) {
  const salt = await bcrypt.genSalt(10);
  let encryptetPassword = await bcrypt.hash(canditatePassword, salt);
  console.log(encryptetPassword);
  return encryptetPassword;
};

db.korisnik.prototype.comparePassword = async function (canditatePassword) {
  const isMatch = await bcrypt.compare(canditatePassword, this.password);
  return isMatch;
};

// VEZE IZMEDJU MODELA

db.korisnik.hasMany(db.basket, {
  foreignKey: 'korisnik_id',
});
db.basket.belongsTo(db.korisnik, {
  foreignKey: 'korisnik_id',
});

db.basket.belongsToMany(db.product, {
  through: db.basket_product,
  foreignKey: 'basket_id',
});
db.product.belongsToMany(db.basket, {
  through: db.basket_product,
  foreignKey: 'product_id',
});

module.exports = db;
