const mongoose = require("mongoose");

const connectToDb = () => {
  return mongoose.connect(process.env.DB_URL);
};

module.exports = connectToDb;
