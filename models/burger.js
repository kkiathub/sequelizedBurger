module.exports = (sequelize, DataTypes) => {
  const Burger = sequelize.define("Burger", {
      name : { 
        type: DataTypes.STRING, 
        allowNull: false,
        validate : {
          notEmpty : true
        }
      },
      devoured : { type: DataTypes.BOOLEAN, defaultValue: false },
      rating: {
        type: DataTypes.INTEGER
      }
  });

  Burger.associate = (models) => {
    // We're saying that a Post should belong to an Author
    // A Post can't be created without an Author due to the foreign key constraint
    Burger.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: true
      }
    });
  };
  return Burger;
}

