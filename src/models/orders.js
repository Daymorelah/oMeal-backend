module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    meal: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    drink: {
      type: DataTypes.JSON,
      allowNull: true,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    orderType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }, {
    tableName: 'orders'
  });
  Order.associate = models => {
    Order.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'owner_of_order'
    });
  };
  return Order;
};