const { db } = require("../models/cars.model");
const CarModel = require("../models/cars.model");

exports.GetAllCars = async (req, res, next) => {
  try {
    const cars = await CarModel.find(
      {},
      "Model Make Variant Ex_Showroom_Price Fuel_Type ARAI_Certified_Mileage Body_Type Displacement"
    );
    function shuffle(array) {
      array.sort(() => Math.random() - 0.5);
    }
    shuffle(cars);
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

exports.GetCarDetails = async (req, res, next) => {
  try {
    const { _id } = req.params;
    const car = await CarModel.findOne({ _id });
    return res.status(200).json(car);
  } catch (err) {
    console.log("error");
    console.log(err);
    return res.status(400).json({
      success: false,
      message: "UNKNOWN SERVER ERROR",
    });
  }
};

exports.GetPopularCars = async (req, res, next) => {
  try {
    let obj = {};
    const cars = await CarModel.find();
    for (let car of cars) {
      if (obj[car.Make]) {
        if (obj[car.Make][car.Model]) {
          obj[car.Make][car.Model] += 1;
        } else {
          obj[car.Make][car.Model] = 1;
        }
      } else {
        obj[car.Make] = {};
        obj[car.Make][car.Model] = 1;
      }
    }
    const graphDetails = {};
    Object.keys(obj).map((company) => {
      graphDetails[company] = [];
      Object.keys(obj[company]).map((model) => {
        graphDetails[company].push({
          name: model,
          value: obj[company][model],
        });
      });
    });

    return res.status(200).json(graphDetails);
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
    const getSumByKey = (arr, key) => {
      return arr.reduce(
        (accumulator, current) => accumulator + Number(current[key]),
        0
      );
    };
    const carsBody = await CarModel.aggregate([
      { $group: { _id: "$Body_Type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const carsFuel = await CarModel.aggregate([
      { $group: { _id: "$Fuel_Type", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const carsGears = await CarModel.aggregate([
      { $group: { _id: "$Gears", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    const carsEngLocation = await CarModel.aggregate([
      { $group: { _id: "$Engine_Location", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    for (property in carsEngLocation) {
      if (property == "") {
        delete carsEngLocation[property];
      }
    }
    const totalCarBody = getSumByKey(carsBody.slice(0, 5), "count");
    const totalCarFuel = getSumByKey(carsFuel.slice(0, 5), "count");
    const totalCarGears = getSumByKey(carsGears.slice(0, 4), "count");
    const totalCarEngLocation = getSumByKey(
      carsEngLocation.slice(0, 4),
      "count"
    );
    return res.status(200).json({
      success: true,
      carsBody,
      carsFuel,
      carsGears,
      carsEngLocation,
      totalCarBody,
      totalCarFuel,
      totalCarGears,
      totalCarEngLocation,
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
    const cars = await CarModel.find({}, "Ex_Showroom_Price Body_Type ");
    const newData = cars.map(({ id, Body_Type, Ex_Showroom_Price }) => ({
      id,
      Body_Type,
      Price: Number(Ex_Showroom_Price.replace(/\D/g, "")),
    }));
    let bodyType = {};
    for (let car of newData) {
      if (bodyType[car.Body_Type]) {
        bodyType[car.Body_Type] = {
          price: bodyType[car.Body_Type].price + car.Price,
          count: bodyType[car.Body_Type].count + 1,
        };
      } else {
        bodyType[car.Body_Type] = {
          price: car.Price,
          count: 1,
        };
      }
    }
    return res.status(200).json({
      success: true,
      bodyType,
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

exports.GetSimilarCars = async (req, res, next) => {
  try {
    const cars = await CarModel.find(
      {},
      "Fuel_Type ARAI_Certified_Mileage Displacement Fuel_Tank_Capacity Power Torque Gears"
    );

    var popularCar = [];
    cars.forEach((car) => {
      popularCar.push(
        (car.Fuel_Type ? car.Fuel_Type : "") +
          "," +
          (car.ARAI_Certified_Mileage ? car.ARAI_Certified_Mileage : "") +
          "," +
          (car.Displacement ? car.Displacement : "") +
          "," +
          (car.Fuel_Tank_Capacity ? car.Fuel_Tank_Capacity : "") +
          ","
      );
    });
    var popularCarCount = popularCar.reduce(function (obj, item) {
      obj[item] = (obj[item] || 0) + 1;
      return obj;
    }, {}); //sort popularCarCount by value
    popularCarCount = Object.keys(popularCarCount).map(function (key) {
      return [key, popularCarCount[key]];
    });
    popularCarCount.sort(function (first, second) {
      return second[1] - first[1];
    });
    popularCarCount = popularCarCount.slice(0, 9);
    var popularCar = popularCarCount.map(function (item) {
      return item[0];
    });

    return res.status(200).json({
      success: true,
      popularCarCount,
      // cars,
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

exports.GetCarSimilarity = async (req, res, next) => {
  try {
    // const { text } = req.body;
    // if (!text)
    //   return res.status(400).json({
    //     success: false,
    //     message: "TEXT_NOT_PROVIDED",
    //   });
    // const allProducts = await ProductModel.find();
    // const cosine = allProducts.map((p) => {
    //   const c = CosineSimilarity(text, p.name);
    //   const cd = CosineSimilarity(text, p.description);
    //   return {
    //     ...p._doc,
    //     score: Math.max(c, cd),
    //   };
    // });
    // return res.status(200).json(cosine);
  } catch (err) {
    console.log("ERROR");
    console.log(err);
  }
};
