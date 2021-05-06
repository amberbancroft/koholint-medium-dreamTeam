'use strict';
module.exports = (sequelize, DataTypes) => {
  const Story = sequelize.define('Story', {
    title: {type: DataTypes.STRING(50), allowNull: false },
    imgUrl: {type: DataTypes.STRING(255)},
    content: {type: DataTypes.TEXT, allowNull: false, unique: true},
    userId: {type: DataTypes.INTEGER, allowNull: false, references: {model: 'Users'}, unique: true}
  }, {});
  Story.associate = function(models) {
    // associations can be defined here
    Story.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Story;
};
