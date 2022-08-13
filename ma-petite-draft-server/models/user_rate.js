"use strict";
module.exports = function(sequelize, DataTypes) {
	var user_rate = sequelize.define('user_rate', {
		deleted_row: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
		updatedby: DataTypes.STRING,
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: DataTypes.INTEGER,
		rate_id: DataTypes.INTEGER
  }, {
    /*classMethods: {
      associate: function(models) {
        user_rate.belongsTo(models.user, {
          foreignKey: 'user_id'
        });
				user_rate.belongsTo(models.rate, {
          foreignKey: 'rate_id'
        });
      }
    },*/
    defaultScope: {
      where: {
        deleted_row: false
      }
    }
  });

	user_rate.associate = function(models) {
		user_rate.belongsTo(models.user, {
			foreignKey: 'user_id'
		});
		user_rate.belongsTo(models.rate, {
			foreignKey: 'rate_id'
		});
	};

  return user_rate;
};
