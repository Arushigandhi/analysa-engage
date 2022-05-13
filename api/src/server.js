require("dotenv").config({
  path: __dirname + "/.env",
});
const express = require("express");
const mongoose = require("mongoose");

const app = express();

const db = process.env.MONGO_DB_URI;

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected!");

    app.get("/hey", (req, res) => {
      res.status(200).json({
        message: "Arushi Gandhi's API",
      });
    });
    app.use("/api/cars", require("./routes/cars.routes"));

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Coudn't connect");
  });
