async function getWeather() {
    const apiKey = 'YOUR_API_KEY'; // Replace with your OpenWeatherMap API key
    const cityInput = document.getElementById('cityInput').value;
    const weatherInfo = document.getElementById('weatherInfo');

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`);
        const data = await response.json();

        if (response.ok) {
            const temperature = data.main.temp;
            const description = data.weather[0].description;
            const iconCode = data.weather[0].icon;

            const imageUrl = `http://openweathermap.org/img/w/${iconCode}.png`;

            // Update the HTML with weather information
            weatherInfo.innerHTML = `
                <p>Temperature: ${temperature} &#8451;</p>
                <p>Description: ${description}</p>
                <img src="${imageUrl}" alt="Weather Icon">
            `;

            // Update background color based on weather conditions
            updateBackgroundColor(description);
        } else {
            weatherInfo.textContent = 'City not found';
            weatherInfo.style.backgroundColor = '#ff6666'; // Red background for error
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherInfo.textContent = 'Error fetching weather data';
        weatherInfo.style.backgroundColor = '#ff6666'; // Red background for error
    }
}

function updateBackgroundColor(description) {
    const container = document.querySelector('.container');

    // Update background color based on weather conditions
    switch (description.toLowerCase()) {
        case 'clear sky':
            container.style.backgroundColor = '#87CEEB'; // Sky Blue
            break;
        case 'few clouds' || 'scattered clouds' || 'broken clouds':
            container.style.backgroundColor = '#87CEFA'; // Light Sky Blue
            break;
        case 'shower rain' || 'rain':
            container.style.backgroundColor = '#4682B4'; // Steel Blue
            break;
        case 'thunderstorm':
            container.style.backgroundColor = '#191970'; // Midnight Blue
            break;
        case 'snow':
            container.style.backgroundColor = '#F0F8FF'; // Alice Blue
            break;
        default:
            container.style.backgroundColor = '#f2f2f2'; // Default background color
            break;
    }
}
