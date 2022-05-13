const CarModel = require("../models/cars.model");

exports.GetAllCars = async (req, res, next) => {
  try {
    const cars = await CarModel.find(
      {},
      "Model Make Variant Ex-Showroom_Price Fuel_Type ARAI_Certified_Mileage Body_Type Displacement"
    );
    return res.status(200).json({
      success: true,
      cars,
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

exports.GetPopularCars = async (req, res, next) => {
  try {
    const cars = await CarModel.aggregate([
      { $group: { _id: "$Model", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    return res.status(200).json({
      success: true,
      cars,
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

exports.GetCarTypes = async (req, res, next) => {
  try {
    const cars = await CarModel.aggregate([
      { $group: { _id: "$Body_Type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    return res.status(200).json({
      success: true,
      cars,
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

exports.GetPriceRange = async (req, res, next) => {
  try {
    const cars = await CarModel.aggregate([
      {
        $addFields: {
          chars: {
            $map: {
              input: {
                $range: [
                  0,
                  {
                    $strLenCP: "$Ex-Showroom_Price",
                  },
                ],
              },
              in: {
                $substrCP: ["$Ex-Showroom_Price", "$$this", 1],
              },
            },
          },
        },
      },
      {
        $project: {
          numbers: {
            $filter: {
              input: "$chars",
              as: "char",
              cond: {
                $and: [{ $gte: ["$$char", "0"] }, { $lte: ["$$char", "9"] }],
              },
            },
          },
        },
      },
      {
        $project: {
          price: {
            $reduce: {
              input: "$numbers",
              initialValue: "",
              in: { $concat: ["$$value", "$$this"] },
            },
          },
        },
      },
      { $sort: { price: -1 } },
    ]);

    return res.status(200).json({
      success: true,
      cars,
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
