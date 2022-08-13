"use strict";
module.exports = function(sequelize, DataTypes) {
	var user_game = sequelize.define('user_game', {
	deleted_row: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
	updatedby: DataTypes.STRING,
	game_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
  game_order: DataTypes.INTEGER,
  turn_to_pick: DataTypes.BOOLEAN,
  way_id: DataTypes.INTEGER
  }, {
    defaultScope: {
      where: {
        deleted_row: false
      }
    }
  });

	user_game.associate = function(models) {
		user_game.belongsTo(models.game, {
			foreignKey: 'game_id'
		});
		user_game.belongsTo(models.user, {
			foreignKey: 'user_id'
		});
		user_game.belongsTo(models.draft_way, {
			foreignKey: 'way_id'
		});
	};

  return user_game;
};
