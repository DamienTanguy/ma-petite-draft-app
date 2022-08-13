"use strict";
module.exports = function(sequelize, DataTypes) {
	var wish_list_reference = sequelize.define('wish_list_reference', {
		deleted_row: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
		updatedby: DataTypes.STRING,
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
		name: DataTypes.INTEGER,
		league_id: DataTypes.INTEGER
  }, {
    /*classMethods: {
      associate: function(models) {
        wish_list_reference.hasMany(models.wish_list_user, {
          foreignKey: 'wish_list_reference_id'
        });
				wish_list_reference.belongsTo(models.league, {
          foreignKey: 'league_id'
        });
      }
    },*/
    defaultScope: {
      where: {
        deleted_row: false
      }
    }
  });

	wish_list_reference.associate = function(models) {
		wish_list_reference.hasMany(models.wish_list_user, {
			foreignKey: 'wish_list_reference_id'
		});
		wish_list_reference.belongsTo(models.league, {
			foreignKey: 'league_id'
		});
	};

  return wish_list_reference;
};
