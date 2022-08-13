"use strict";
module.exports = function(sequelize, DataTypes) {
	var game_state = sequelize.define('game_state', {
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
        game_state.HasMany(models.game, {
          foreignKey: 'game_state_id'
        });
      }
    },*/
    defaultScope: {
      where: {
        deleted_row: false
      }
    }
  });

	game_state.associate = function(models) {
		game_state.hasMany(models.game, {
			foreignKey: 'game_state_id'
		});
	};

  return game_state;
};
