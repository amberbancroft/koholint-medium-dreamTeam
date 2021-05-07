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
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
