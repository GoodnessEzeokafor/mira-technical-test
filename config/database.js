/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config();
module.exports = {
  url:process.env.DB_URL,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false, // if using a self-signed certificate
    },
  },
};
