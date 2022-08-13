"use strict";
module.exports = function(sequelize, DataTypes) {
	var wish_list_user = sequelize.define('wish_list_user', {
		deleted_row: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
		updatedby: DataTypes.STRING,
		user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true
    },
		wish_list_reference_id: {
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
				wish_list_user.belongsTo(models.user, {
					foreignKey: 'user_id'
				});
				wish_list_user.belongsTo(models.wish_list_reference, {
          foreignKey: 'wish_list_reference_id'
        });
				wish_list_user.belongsTo(models.player, {
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

	wish_list_user.associate = function(models) {
		wish_list_user.belongsTo(models.user, {
			foreignKey: 'user_id'
		});
		wish_list_user.belongsTo(models.wish_list_reference, {
			foreignKey: 'wish_list_reference_id'
		});
		wish_list_user.belongsTo(models.player, {
			foreignKey: 'player_id'
		});
	};

  return wish_list_user;
};
