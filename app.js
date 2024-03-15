const axios = require("axios");
const inquirer = require("inquirer");
const chalk = require("chalk");

const BASE_PATH = "http://api.openweathermap.org/data/2.5/weather";
const API_KEY = "d74109f00234b382c90330730083ac7c";

// Use inquirer for user input
inquirer
  .prompt([
    {
      type: "input",
      name: "location",
      message: "Enter a location or a postal code:",
      validate: function (value) {
        if (value.trim().length > 0) {
          return true;
        }
        return "Please enter a location or postal code.";
      },
    },
  ])
  .then((answers) => {
    const location = answers.location;

    axios
      .get(`${BASE_PATH}?q=${location}&units=metric&appid=${API_KEY}`)
      .then((response) => {
        const weather = response.data;
        const temperature = weather.main.temp;
        const description = weather.weather[0].description;
        const windSpeed = weather.wind.speed;
        const humidity = weather.main.humidity;

        const message = `\nCurrent temperature: ${chalk.red(
          temperature
        )}°C\nWeather description: ${chalk.blue(
          description
        )}\nWind speed: ${chalk.green(windSpeed)} m/s\nHumidity: ${chalk.cyan(
          humidity
        )}%`;

        console.log(message);
        process.exit();
      })
      .catch((err) => {
        console.log(`Error: ${err.response.data.message}`);
        process.exit();
      });
  })
  .catch((error) => {
    console.log(chalk.blue("An error occurred:", error));
    process.exit();
  });
