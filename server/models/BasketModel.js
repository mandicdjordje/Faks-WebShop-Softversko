// Trega Uraditi Model i povezati

module.exports = (sequelize, DataTypes) => {
  const Basket = sequelize.define(
    'basket',
    {
      basket_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    },
    { freezeTableName: true }
  );

  return Basket;
};
