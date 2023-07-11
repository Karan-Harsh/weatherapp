const express = require("express");
const axios = require("axios");

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static("public"));

const apiKey = "513bcda84ed59d16b00123503dc2f093";

app.post("/getWeather", async (req, res) => {
  const { cities } = req.body;
  const weatherData = {};

  try {
    for (const city of cities) {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      console.log(`API Response for ${city}:`, response.data);

      const temperature = response.data.main.temp;
      weatherData[city] = `${temperature}°C`;
    }

    res.json({ weather: weatherData });
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
