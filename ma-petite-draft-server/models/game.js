"use strict";
module.exports = function(sequelize, DataTypes) {
	var game = sequelize.define('game', {
		deleted_row: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
		updatedby: DataTypes.STRING,
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
		code: DataTypes.STRING,
		name: DataTypes.STRING,
		league_id: DataTypes.INTEGER,
		game_state_id: DataTypes.INTEGER
  }, {
    defaultScope: {
      where: {
        deleted_row: false
      }
    }
  });

	game.associate = function(models) {
		game.belongsTo(models.league, {
			foreignKey: 'league_id'
		});
		game.belongsTo(models.game_state, {
			foreignKey: 'game_state_id'
		});
		game.hasMany(models.picked_player_in_game, {
			foreignKey: 'game_id'
		});
		game.hasMany(models.user_game, {
			foreignKey: 'game_id'
		});
	};

  return game;
};
