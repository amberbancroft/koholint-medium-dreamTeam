<<<<<<< HEAD
// require("dotenv").config();
=======
require("dotenv").config();
>>>>>>> ebd3dcd7714a9007accff4aad58ff6701a5896b1
const { sequelize } = require('./db/models');

sequelize.showAllSchemas({ logging: false }).then(async (data) => {
  if (!data.includes(process.env.SCHEMA)) {
    await sequelize.createSchema(process.env.SCHEMA);
  }
});