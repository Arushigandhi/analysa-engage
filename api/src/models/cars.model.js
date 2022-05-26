const mongoose = require("mongoose");

const CarModel = new mongoose.Schema({
  Model: {
    type: String,
    required: false,
  },
  Make: {
    type: String,
    required: false,
  },
  Variant: {
    type: String,
    required: false,
  },
  Ex_Showroom_Price: {
    type: String,
    required: false,
  },
  Fuel_Type: {
    type: String,
    required: false,
  },
  ARAI_Certified_Mileage: {
    type: String,
    required: false,
  },
  Body_Type: {
    type: String,
    required: false,
  },
  Displacement: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("Cars", CarModel);
