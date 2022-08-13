"use strict";
module.exports = function(sequelize, DataTypes) {
	var league = sequelize.define('league', {
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
        league.HasMany(models.club, {
          foreignKey: 'league_id'
        });
				league.HasMany(models.game, {
          foreignKey: 'league_id'
        });
				league.HasMany(models.wish_list_reference, {
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

	league.associate = function(models) {
		league.hasMany(models.club, {
			foreignKey: 'league_id'
		});
		league.hasMany(models.game, {
			foreignKey: 'league_id'
		});
		league.hasMany(models.wish_list_reference, {
			foreignKey: 'league_id'
		});
	};

  return league;
};
