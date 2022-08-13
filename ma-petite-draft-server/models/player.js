"use strict";
module.exports = function(sequelize, DataTypes) {
	var player = sequelize.define('player', {
		deleted_row: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
		updatedby: DataTypes.STRING,
		id: {
	      type: DataTypes.INTEGER,
	      primaryKey: true,
	      autoIncrement: true
	    },
	    name: DataTypes.STRING,
	    position_id: DataTypes.INTEGER,
		club_id: DataTypes.INTEGER,
		rate: DataTypes.FLOAT,
		goal: DataTypes.INTEGER,
		price: DataTypes.INTEGER,
		start_line_up: DataTypes.INTEGER
  }/*, {
    classMethods: {
      associate: function(models) {
				player.belongsTo(models.club, {
          foreignKey: 'club_id'
        });
				player.belongsTo(models.position, {
          foreignKey: 'position_id'
        });
				player.hasMany(models.picked_player_in_game, {
          foreignKey: 'player_id'
        });
				player.hasMany(models.wish_list_user, {
          foreignKey: 'player_id'
        });
      }
    }*/,{
		defaultScope: {
			where: {
				deleted_row: false
			}
		}
	}
  /*}*/);

	//https://sequelize.org/v4/manual/tutorial/upgrade-to-v4.html
	player.associate = function(models) {
		player.belongsTo(models.club, {
			foreignKey: 'club_id'
		});
		player.belongsTo(models.position, {
			foreignKey: 'position_id'
		});
		player.hasMany(models.picked_player_in_game, {
			foreignKey: 'player_id'
		});
		player.hasMany(models.wish_list_user, {
			foreignKey: 'player_id'
		});
	};

  return player;
};
