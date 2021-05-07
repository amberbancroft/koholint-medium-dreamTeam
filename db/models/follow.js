'use strict';
module.exports = (sequelize, DataTypes) => {
  const Follow = sequelize.define('Follow', {
    followerId: {type: DataTypes.INTEGER, allowNull: false, references: { model:'Users'}},
    followedId: {type: DataTypes.INTEGER, allowNull: false, references: { model:'Users'}}
  }, {});
  Follow.associate = function(models) {
    // associations can be defined here
    Follow.belongsTo(models.User, {foreignKey: 'followerId'})
    Follow.belongsTo(models.User, {foreignKey: 'followedId'})
  };
  return Follow;
};