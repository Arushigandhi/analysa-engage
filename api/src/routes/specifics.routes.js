const express = require("express");
const controller = require("../controllers/specifics.controller");
const router = express.Router();

router.get("/get-all-specifics", controller.GetAllSpecifics);
router.post("/find-similarity", controller.FindSimilarity);

module.exports = router;
