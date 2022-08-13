"use strict";
module.exports = function(sequelize, DataTypes) {
	var club = sequelize.define('club', {
		deleted_row: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
		updatedby: DataTypes.STRING,
		id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
	league_id: DataTypes.INTEGER
  }/*, {
    classMethods: {
      associate: function(models) {
        club.HasMany(models.player, {
          foreignKey: 'club_id'
        });
				club.belongsTo(models.league, {
          foreignKey: 'league_id'
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

	club.associate = function(models) {
		club.hasMany(models.player, {
			foreignKey: 'club_id'
		});
		club.belongsTo(models.league, {
			foreignKey: 'league_id'
		});
	};

  return club;
};
