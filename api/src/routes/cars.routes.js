const express = require("express");
const controller = require("../controllers/car.controller");
const router = express.Router();

router.get("/get-all-cars", controller.GetAllCars);
router.get("/get-popular-cars", controller.GetPopularCars);
router.get("/get-car-types", controller.GetCarTypes);
router.get("/get-car-price", controller.GetPriceRange);
module.exports = router;
