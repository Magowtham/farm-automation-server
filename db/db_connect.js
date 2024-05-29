const mongoose = require("mongoose");

const connectToDb = () => {
  console.log(process.env.DB_URL);
  return mongoose.connect(process.env.DB_URL);
};

module.exports = connectToDb;
