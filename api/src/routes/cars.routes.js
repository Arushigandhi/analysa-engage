const express = require("express");
const controller = require("../controllers/car.controller");
const router = express.Router();

router.get("/get-all-cars", controller.GetAllCars);
router.get("/get-car-details/:_id", controller.GetCarDetails);
router.get("/get-popular-cars", controller.GetPopularCars);
router.get("/get-car-types", controller.GetCarTypes);
router.get("/get-car-price", controller.GetPriceRange);
router.get("/get-similar-cars", controller.GetSimilarCars);
module.exports = router;
