"use strict";
module.exports = function(sequelize, DataTypes) {
	var position = sequelize.define('position', {
		deleted_row: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
		updatedby: DataTypes.STRING,
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING
  }, {
    /*classMethods: {
      associate: function(models) {
        position.HasMany(models.player, {
          foreignKey: 'position_id'
        });
      }
    },*/
    defaultScope: {
      where: {
        deleted_row: false
      }
    }
  });

	position.associate = function(models) {
		position.hasMany(models.player, {
			foreignKey: 'position_id'
		});
	};

  return position;
};
