const apiKey = d8b85629d2a45551a8926a1d59327e82; // Replace with your OpenWeatherMap API key

// Function to fetch weather data by user-inputted location
function getWeatherByLocation() {
    const location = document.getElementById('locationInput').value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

// Function to display the weather data
function displayWeather(data) {
    const weatherDataDiv = document.getElementById('weatherData');
    const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherDataDiv.innerHTML = `
        <h2>Weather in ${data.name}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}" class="weather-icon">
        <p>Temperature: ${data.main.temp}°C</p>
        <p>Weather: ${data.weather[0].description}</p>
        <p>Humidity: ${data.main.humidity}%</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
    `;
}

// Optional: Function to fetch weather data based on user's current location
function getWeatherByCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => {
                    displayWeather(data);
                })
                .catch(error => {
                    console.error('Error fetching weather data:', error);
                });
        });
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

