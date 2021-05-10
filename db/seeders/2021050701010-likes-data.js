'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Likes", [
      {likeCount: 0},
      {likeCount: 0},
      {likeCount: 0},
      {likeCount: 0},
      {likeCount: 0},
      {likeCount: 0},
      {likeCount: 0},
      {likeCount: 0},
      {likeCount: 0},
      {likeCount: 0}
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Likes', null, {});
  }
};
