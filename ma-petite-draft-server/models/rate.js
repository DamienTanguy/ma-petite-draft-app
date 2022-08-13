"use strict";
module.exports = function(sequelize, DataTypes) {
	var rate = sequelize.define('rate', {
		deleted_row: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
		updatedby: DataTypes.STRING,
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
		value: DataTypes.INTEGER
  }, {
    /*classMethods: {
      associate: function(models) {
        rate.hasMany(models.user_rate, {
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

	rate.associate = function(models) {
		rate.hasMany(models.user_rate, {
			foreignKey: 'rate_id'
		});
	};

  return rate;
};
