'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    likeCount: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.hasMany(models.Story, {foreignKey: 'likesId'})
    Like.hasOne(models.Comment, {foreignKey: 'likesId'})
  };
  return Like;
};