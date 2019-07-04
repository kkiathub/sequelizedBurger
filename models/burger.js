module.exports = (sequelize, DataTypes) => {
  var Burger = sequelize.define("burger", {
      name : { type: DataTypes.STRING, allowNull: false },
      devoured : { type: DataTypes.BOOLEAN, defaultValue: false }
  });
  return Burger;
}

