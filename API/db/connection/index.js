require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = () =>
  new Promise((resolve, reject) => {
    mongoose.connect(process.env.DB_URL);

    const db = mongoose.connection;
    db.on("error", () => {
      console.error.bind(console, "connection error:");
      reject(
        new Error(
          "Error connecting to the database!"
        )
      );
    });
    db.once("open", () => resolve("🚀 Database Connection Successful."));
  });

module.exports = { dbConnection };