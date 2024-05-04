module.exports = (sequelize, DataTypes) => {
  const Basket = sequelize.define(
    "basket",
    {
      basket_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      price: {
        type: DataTypes.FLOAT,
        defaultValue: 0,
      },
      status: {
        type: DataTypes.STRING,
        status: ["Accepted", "Decline"],
        allowNull: false,
      },
    },
    { freezeTableName: true }
  );

  return Basket;
};
