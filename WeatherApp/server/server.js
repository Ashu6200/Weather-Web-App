const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors())
app.use(express.json());
const port = 5000;

const apiKey = "ab6d9df66b196a45cefc915b076f3247";

const cities = [
  "Durg",
  "Mumbai",
  "Delhi",
  "Jaipur",
  "Kota",
  "Korba",
  "Bilaspur",
  "Pune",
  "Chennai", //10
  "Bengaluru",
  "Jabalpur",
  "Agra",
  "Ahmedabad",
  "Raipur",
  "Kochi",
  "Kolkata",
  "Patna",
  "Siliguri",
  "Gorakhpur",
  "Visakhapatnam",
  "Jamnagar",
  "Udaipur",
  "Solapur",
  "Bhilai",
  "Indore",
  "Bhopal",
  "Hyderabad",
  "Nagpur",
  "Jhansi",
  "Rourkela",
]

const pageSize = 10;
app.get('/weather', (req, res) => {
  const page = req.query.page || 1;

  const startIndex = (page - 1) * pageSize;
  const endIndex = startIndex + pageSize;

  const promises = cities
    .slice(startIndex, endIndex)
    .map(city => axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`));

  Promise.all(promises)
    .then(responses => {
      const weatherData = responses.map(response => response.data);
      res.json({
        data: weatherData,
        page: page,
        pageSize: pageSize,
        total: cities.length
      });
    })
    .catch(error => {
      console.error(error);
      res.status(500).json({ error: 'Error retrieving weather data' });
    });
});

app.listen(port, () => {
  console.log(`Weather API listening at http://localhost:${port}`);
});
