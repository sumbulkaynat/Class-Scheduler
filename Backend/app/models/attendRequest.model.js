const mongoose = require("mongoose");

const attendRequest = mongoose.model(
  "attendRequest",
  new mongoose.Schema({
    username: String,
    userid: String,
    date: String,
    day: String,
    subject: String,
    vaccineStatus: String
  })
);

module.exports = attendRequest;
