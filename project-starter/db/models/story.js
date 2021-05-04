'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: {type: DataTypes.STRING(50), allowNull: false },
    content: {type: DataTypes.TEXT, allowNull: false},
    userId: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'Users'}}
  }, {});
  Story.associate = function(models) {
    // associations can be defined here
    Story.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Story;
};