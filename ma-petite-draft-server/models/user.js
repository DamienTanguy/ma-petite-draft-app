"use strict";
module.exports = function(sequelize, DataTypes) {
	var user = sequelize.define('user', {
		deleted_row: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
		updatedby: DataTypes.STRING,
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: DataTypes.STRING,
	//salt: DataTypes.STRING,
	//hash: DataTypes.STRING,
	password: { type: DataTypes.STRING, allowNull: false},
	mail: DataTypes.STRING,
	average_rate: DataTypes.INTEGER
  }, {
    defaultScope: {
      where: {
        deleted_row: false
      }
    }
  });

	user.associate = function(models) {
		user.hasMany(models.picked_player_in_game, {
			foreignKey: 'user_id'
		});
		user.hasMany(models.user_rate, {
			foreignKey: 'user_id'
		});
		user.hasMany(models.wish_list_user, {
			foreignKey: 'user_id'
		});
		user.hasMany(models.user_game, {
			foreignKey: 'user_id'
		});
	};

  return user;
};
