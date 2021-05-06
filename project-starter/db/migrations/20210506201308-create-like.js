'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Likes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Users' }
      },
      storyId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Stories' }
      },
      likeCount: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      commentId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: 'Comments' }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Likes');
  }
};