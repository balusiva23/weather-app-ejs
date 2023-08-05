const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (e.g., CSS, JS, images) from the 'public' directory if needed.
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index.ejs', { weatherData: null });
});

app.post('/weather', (req, res) => {
  const apiKey = '5fcb0017515c5ce56a59facaf1f66cf2';
  const city = req.body.city;

  axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => {
      const weatherData = {
        temperature: response.data.main.temp,
        tempMin: response.data.main.temp_min,
        tempMax: response.data.main.temp_max,
        weatherDescription: response.data.weather[0].description,
        windSpeed: response.data.wind.speed,
        humidity: response.data.main.humidity,
      };
      res.render('weather.ejs', { weatherData, error: null });
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      res.render('weather.ejs', { weatherData: null, error: 'City not found or error fetching data.' });
    });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
