"use strict";
module.exports = function(sequelize, DataTypes) {
	var picked_player_in_game = sequelize.define('picked_player_in_game', {
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
		player_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    }
  }, {
    /*classMethods: {
      associate: function(models) {
        picked_player_in_game.belongsTo(models.game, {
          foreignKey: 'game_id'
        });
				picked_player_in_game.belongsTo(models.user, {
          foreignKey: 'user_id'
        });
				picked_player_in_game.belongsTo(models.player, {
          foreignKey: 'player_id'
        });
      }
    },*/
    defaultScope: {
      where: {
        deleted_row: false
      }
    }
  });

	picked_player_in_game.associate = function(models) {
		picked_player_in_game.belongsTo(models.game, {
			foreignKey: 'game_id'
		});
		picked_player_in_game.belongsTo(models.user, {
			foreignKey: 'user_id'
		});
		picked_player_in_game.belongsTo(models.player, {
			foreignKey: 'player_id'
		});
	};

  return picked_player_in_game;
};
