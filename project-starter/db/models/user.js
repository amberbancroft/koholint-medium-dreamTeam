"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      email: { type: DataTypes.STRING(255), allowNull: false, unique: true },
      imgUrl: {type: DataTypes.STRING(255)},
      firstName: { type: DataTypes.STRING(50), allowNull: false },
      lastName: { type: DataTypes.STRING(50), allowNull: false },
      userName: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      hashedPassword: { type: DataTypes.STRING.BINARY, allowNull: false },
    },
    {}
  );
  User.associate = function (models) {
    // associations can be defined here
    User.hasMany(models.Story, {foreignKey: 'userId'})
  };
  return User;
};
