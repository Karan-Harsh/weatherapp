document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("weatherForm")
    .addEventListener("submit", async (event) => {
      event.preventDefault();

      const cityInput = document.getElementById("cityInput");
      const cityNames = cityInput.value.split(",").map((city) => city.trim());

      if (cityNames.length === 0) {
        return;
      }

      const weatherResults = document.getElementById("weatherResults");
      weatherResults.innerHTML = "";

      try {
        const response = await fetch("/getWeather", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ cities: cityNames }),
        });

        if (!response.ok) {
          throw new Error("Failed to retrieve weather data");
        }

        const data = await response.json();

        // Display weather results
        for (const city of cityNames) {
          const weather = data.weather[city];
          const weatherItem = document.createElement("p");
          weatherItem.textContent = `${city}: ${weather}`;
          weatherResults.appendChild(weatherItem);
        }
      } catch (error) {
        console.error("Error:", error.message);
      }
    });
});
