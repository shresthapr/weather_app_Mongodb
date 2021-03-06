"use strict";

const http = require("http");
const express = require("express");
const app = express();
const fetch = require("node-fetch");

const cors = require("cors");
app.use(cors());

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const port = process.env.PORT || 3000;
const host = process.env.HOST || "localhost";
const mydb = process.env.ATLAS_DB;
const APIkey = process.env.WeatherApi;
const weatherAPI = `https://api.openweathermap.org/data/2.5/weather?q=`;

//set connection to db
mongoose.connect(mydb, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const mdb = mongoose.connection;
//checking connection status
mdb.on("Connected", function () {
  console.log("Mongoose default connection is now Open");
});
mdb.on("error", function (err) {
  console.log("Mongoose default connection error: " + err);
});
mdb.on("disconnected", function () {
  console.log("Mongoose default connection is Disconnected");
});

const weatherSchema = new Schema({
  temp: Number,
  feels_like: Number,
  temp_min: Number,
  temp_max: Number,
  humidity: Number,
  visibility: Number,
  wind: { speed: Number, deg: Number },
  description: String,
  date: { type: Number, default: Date.now },
});
//makes new model

const weatherdata = mongoose.model("weatherdata", weatherSchema);
const checker = async () => {
  weatherdata.find({}, (err, weatherdata) => {
    if (err) console.log(err);
    else {
      const checker = Date.now() + 10 * 60 * 1000;
      if (checker > weatherdata[0].date) {
        return true;
      } else {
        return false;
      }
    }
  });
};

async function checkupdate() {
  await checker().then(console.log);
}

const test = console.log(checkupdate());
//updateweatherData
function updateWeather(a, b, c) {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await fetch(
        weatherAPI +
          `${a}` +
          "&units=" +
          `${b}` +
          "&appid=" +
          `${APIkey}` +
          "&lang=" +
          `${c}`
      );
      const data = await result.json();

      //write to mongodb here
      const newPost = new weatherdata({
        temp: data.main.temp,
        feels_like: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        humidity: data.main.humidity,
        visibility: data.visibility,
        wind: { speed: data.wind.speed, deg: data.wind.deg },
        description: data.weather[0].description,
        date: Date.now(),
      });
      newPost.save().then("Weather Data Updated");
      resolve(data);
    } catch (err) {
      reject(new Error(err.message));
    }
  });
}
//const newPost = new weatherData({
//newPost.save().then(console.log('saved and updated'))
//})

const server = http.createServer(app);
app.get("/all", (req, res) => {
  res.send("Hello World");
});

app.get("/weather", async (req, res) => {
  try {
    weatherData = await updateWeather("Helsinki", "metric", "en");
    console.log("This is weather", weatherdata);
    res.send(weatherdata);
  } catch (err) {
    res.send(err);
  }
});
server.listen(port, host, () =>
  console.log(`Server ${host} running on Port ${port}`)
);
