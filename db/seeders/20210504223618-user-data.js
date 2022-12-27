'use strict';

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = 'Users'; 
    return queryInterface.bulkInsert(options, [
      {email: "abc@123.com", imgUrl:"https://i.pinimg.com/236x/b0/77/43/b0774303d8104e60628ba1278ab937b5.jpg", firstName: "Bob", lastName: "Ross", userName: "TheBobRoss", hashedPassword: "password"},
      {email: "abcd@123.com", imgUrl:"https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", firstName: "Gary", lastName: "Li", userName: "GLiEasy", hashedPassword: "password"},
      {email: "abcde@123.com", imgUrl:"https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500", firstName: "Linda", lastName: "May", userName: "MayL", hashedPassword: "password"},
      {email: "abcdefg@123.com", imgUrl:"https://topicimages.mrowl.com/large/gracie/spongebobsquar/thecharacters/sandycheeks_1.jpg", firstName: "Tiana", lastName: "Taylor", userName: "TiaTay", hashedPassword: "password"},
      {email: "abcdef@123.com", imgUrl:"https://2.bp.blogspot.com/-HUNtQ1w74hI/W4HBol51XJI/AAAAAAAAAwY/-cKj6O_PqDwKsgzAi7UnKqhdI_5vfUXPACLcBGAs/s1600/Perry_The_Platypus.png", firstName: "Sarah", lastName: "Banks", userName: "MrsBanks", hashedPassword: "password"}
    ])
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = 'Users'; 
    return queryInterface.bulkDelete(options, null, {});
  }
};
