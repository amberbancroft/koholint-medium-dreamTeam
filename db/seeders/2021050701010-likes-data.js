'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Likes';
    return queryInterface.bulkInsert(options, [
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
    options.tableName = 'Likes';
    return queryInterface.bulkDelete(options, null, {});
  }
};
