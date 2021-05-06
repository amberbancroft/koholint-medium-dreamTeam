'use strict';
module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define('Like', {
    userId: DataTypes.INTEGER,
    storyId: DataTypes.INTEGER,
    likeCount: DataTypes.INTEGER,
    commentId: DataTypes.INTEGER
  }, {});
  Like.associate = function(models) {
    // associations can be defined here
    Like.belongsTo(models.Story, {foreignKey:'storyId'})
    Like.belongsTo(models.User, {foreignKey:'userId'})
    Like.belongsTo(models.Comments, {foreignKey:'commentId'})
  };
  return Like;
};