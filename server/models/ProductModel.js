module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define(
    'product',
    {
      product_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productName: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 1000.0,
      },
    },
    { freezeTableName: true }
  );
  return Product;
};
