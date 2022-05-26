require("dotenv").config({
  path: __dirname + "/.env",
});
const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");

const app = express();
var whitelist = ["http://localhost:3000"];

var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
  next();
});

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
    app.use("/api/cars", require("./routes/specifics.routes"));

    const PORT = process.env.PORT || 8080;
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  })
  .catch((err) => {
    console.log(err);
    console.log("Coudn't connect");
  });
