'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Users", [
      {email: "abc@123.com", firstName: "Bob", lastName: "Ross", userName: "TheBobRoss", hashedPassword: "password"},
      {email: "abcd@123.com", firstName: "Gary", lastName: "Li", userName: "GLiEasy", hashedPassword: "password"},
      {email: "abcde@123.com", firstName: "Linda", lastName: "May", userName: "MayL", hashedPassword: "password"},
      {email: "abcdefg@123.com", firstName: "Tiana", lastName: "Taylor", userName: "TiaTay", hashedPassword: "password"},
      {email: "abcdef@123.com", firstName: "Sarah", lastName: "Banks", userName: "MrsBanks", hashedPassword: "password"}
    ])
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("Users", null, {});
  }
};
