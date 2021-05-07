'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    content: {
      allowNull: false,
      type: DataTypes.STRING(255)
    },
    userId: {
      allowNull: false,
      references: {model: 'Users'},
      type: DataTypes.INTEGER
    },
    likesId: {
      allowNull: false,
      references: {model: 'Likes'},
      type: DataTypes.INTEGER
    },
    storyId: {
      allowNull: false,
      references: {model: 'Stories'},
      type: DataTypes.INTEGER
    },
  }, {});
  Comment.associate = function(models) {
    // associations can be defined here
    Comment.belongsTo(models.Like, {foreignKey: 'likesId'})
    Comment.belongsTo(models.User, {foreignKey: 'userId'})
    Comment.belongsTo(models.Story, {foreignKey: 'storyId'})
  };
  return Comment;
};