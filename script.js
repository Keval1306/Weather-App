// Replace with your OpenWeatherMap API key
const API_KEY = '110227f2e2ef1ad87effc9a4ee06234e';

function getWeather() {
    const cityInput = document.getElementById('city-input');
    const city = cityInput.value;

    if (!city) return;

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('City not found');
            }
            return response.json();
        })
        .then(data => {
            displayWeather(data);
            document.getElementById('error-message').style.display = 'none';
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('error-message').style.display = 'block';
            document.getElementById('weather-info').style.display = 'none';
        });
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');
    const weatherIcon = document.getElementById('weather-icon');
    const temperature = document.getElementById('temperature');
    const description = document.getElementById('description');
    const humidity = document.getElementById('humidity');
    const windSpeed = document.getElementById('wind-speed');

    weatherInfo.style.display = 'block';
    
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} m/s`;
    
    // Set weather icon
    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
}

// Allow Enter key to trigger search
document.getElementById('city-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        getWeather();
    }
});