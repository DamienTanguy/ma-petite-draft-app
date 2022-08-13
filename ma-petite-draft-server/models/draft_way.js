"use strict";
module.exports = function(sequelize, DataTypes) {
	var draft_way = sequelize.define('draft_way', {
		deleted_row: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
		updatedby: DataTypes.STRING,
		id: {
		  type: DataTypes.INTEGER,
		  primaryKey: true,
		  autoIncrement: true
		},
		name: DataTypes.STRING
	  }, {
		defaultScope: {
		  where: {
			deleted_row: false
		  }
		}
	  });

	draft_way.associate = function(models) {
		draft_way.hasMany(models.user_game, {
			foreignKey: 'way_id'
		});
	};

	return draft_way;
};
