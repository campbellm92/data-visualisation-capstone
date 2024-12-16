require("dotenv").config(); // Load environment variables from .env
const fs = require("fs");

module.exports = {
  client: "mysql2",
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    ssl: process.env.DB_CA
      ? {
          rejectUnauthorized: true,
          ca: process.env.DB_CA.replace(/\\n/g, "\n"),
        }
      : false,
  },
};
