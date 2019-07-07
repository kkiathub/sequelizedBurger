module.exports = (sequelize, DataTypes) => {
    const Customer = sequelize.define("Customer", {
        name : { 
          type: DataTypes.STRING, 
          allowNull: false,
          validate : {
            notEmpty : true
          }
        },
    });

    Customer.associate = (models) => {
      Customer.hasMany(models.Burger, {
        onDelete: "cascade"
      });
    };
    return Customer;
  }
  