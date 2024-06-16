document.addEventListener('DOMContentLoaded', () => {
    const endpoint = 'https://restcountries.com/v3.1/all';
  
    fetch(endpoint)
      .then(response => response.json())
      .then(countries => {
        countries.forEach(country => {
          const card = createCard(country);
          document.getElementById('countryCards').appendChild(card);
        });
      })
      .catch(error => console.error('Error fetching countries:', error));
  
    function createCard(country) {
      const card = document.createElement('div');
      card.classList.add('col-lg-4', 'col-sm-12', 'mb-4');
  
      card.innerHTML = `
        <div class="card">
          <div class="card-header">
            <h5 class="card-title">${country.name.common}</h5>
          </div>
          <div class="card-body">
            <img src="${country.flags.svg}" class="card-img-top" alt="Flag">
            <p class="card-text">Capital: ${country.capital}</p>
            <p class="card-text">Region: ${country.region}</p>
            <p class="card-text">Country Code: ${country.cca2}</p>
            <p class="card-text">Latitude/Longitude: ${country.latlng.join(', ')}</p>
            <button class="btn btn-primary btn-block" onclick="fetchWeather('${country.capital}', '${country.latlng.join(',')}')">Check Weather</button>
            <div id="weather-${country.capital}" class="mt-3"></div>
          </div>
        </div>
      `;
  
      return card;
    }
  
    async function fetchWeather(city, latlng) {
      const apiKey = 'YOUR_OPENWEATHERMAP_API_KEY';
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Weather data not available');
        }
        const weatherData = await response.json();
        const weatherElement = document.getElementById(`weather-${city}`);
        weatherElement.innerHTML = `
          <p>Temperature: ${weatherData.main.temp} °C</p>
          <p>Weather: ${weatherData.weather[0].description}</p>
          <p>Humidity: ${weatherData.main.humidity}%</p>
        `;
      } catch (error) {
        console.error('Error fetching weather:', error);
      }
    }
  });