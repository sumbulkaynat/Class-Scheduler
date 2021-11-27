const mongoose = require("mongoose");

const Tutorial = mongoose.model(
  "Tutorial",
  new mongoose.Schema({
    subject: String,
    day: String,
    date: String,
    emptySeats: Number 
  })
);

module.exports = Tutorial;
