document.addEventListener('DOMContentLoaded', () => {
    const weatherForm = document.getElementById('weather-form');
    const cityInput = document.getElementById('city-input');
    const weatherResult = document.getElementById('weather-result');
    const cityName = document.getElementById('city-name');
    const temperature = document.getElementById('temperature');
    const conditions = document.getElementById('conditions');

    const apiKey = '6a1f5716385d49d2bced9cd171aa73a9';

    weatherForm.addEventListener('submit', getWeather);

    function getWeather(e) {
        e.preventDefault();
        const city = cityInput.value;
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
            .then(response => response.json())
            .then(data => {
                if(data.cod === 200) {
                    cityName.textContent = data.name;
                    temperature.textContent = data.main.temp;
                    conditions.textContent = data.weather[0].description;
                    weatherResult.classList.remove('hidden');
                } else {
                    alert('City not found');
                    weatherResult.classList.add('hidden');
                }
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
                alert('An error occurred while fetching weahter data.');
            });
    }
});