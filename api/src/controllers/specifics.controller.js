const { db } = require("../models/cars.model");
const CarModel = require("../models/cars.model");

exports.GetAllSpecifics = async (req, res, next) => {
  try {
    const cars = await CarModel.find(
      {},
      "Type Power Torque Displacement Drivetrain Fuel_Tank_Capacity"
    );
    // console.log(
    //   cars
    //     .map((item) => item.Type)
    //     .filter((value, index, self) => self.indexOf(value) === index)
    // );
    return res.status(200).json({
      success: true,
      cars,
      // filterObj,
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN_SERVER_ERROR",
    });
  }
};

exports.FindSimilarity = async (req, res, next) => {
  try {
    const { carOne, carTwo } = req.body;
    console.log(carOne);
    console.log(carTwo);
    return res.status(200).json({
      success: true,
      // carOne,
      // carTwo,
    });
  } catch (err) {
    console.log("ERROR");
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN_SERVER_ERROR",
    });
  }
};
