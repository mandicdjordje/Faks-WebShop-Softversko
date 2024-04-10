module.exports = (sequelize, DataTypes) => {
  const BasketPorudzbina = sequelize.define('basket-product', {
    basket_product_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.DOUBLE,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      status: ['Accepted', 'Decline'],
      allowNull: false,
    },
  });

  return BasketPorudzbina;
};
