let url = 'https://api.openweathermap.org/data/2.5/weather?appid=00ce9092423f5c5c4c9c3ca21caab335&units=metric&q=';
let temp = document.querySelector('#temp');
let wind_speed = document.querySelector('#wind-speed');
let humidity = document.querySelector('#humidity');
let weather_icon = document.querySelector('.weather');
let search_in = document.querySelector('.search input');
let search_btn = document.querySelector('#search-btn');
let cdata = document.querySelector('.data');
let errorMessage = document.querySelector('.error'); // Store error element

// Initially hide error message
errorMessage.classList.add('hide');

search_btn.addEventListener('click', () => {
    let val = search_in.value;
    checkWeather(val);
});

const checkWeather = async (val) => {
    // Hide error message before making a new request
    errorMessage.classList.add('hide');

    let request = await fetch(url + val);

    if (request.status == 404) {
        errorMessage.classList.remove('hide'); // Show error message
        cdata.classList.add('hide'); // Hide weather data
    } else {
        cdata.classList.remove('hide'); // Show weather data
        let data = await request.json();
        console.log(data);

        temp.innerText = Math.round(data.main.temp) + '°C';
        document.querySelector('#city').innerText = data.name; // Fix missing city element
        wind_speed.innerText = data.wind.speed + ' km/h';
        humidity.innerText = data.main.humidity + '%';

        // Update weather icon based on condition
        let condition = data.weather[0].main;
        let icons = {
            "Mist": "img/mist.png",
            "Fog": "img/mist.png",
            "Rain": "img/rain.png",
            "Clouds": "img/clouds.png",
            "Snow": "img/snow.png",
            "Clear": "img/clear.png",
            "Drizzle": "img/drizzel.png",
            "Haze": "img/mist.png"
        };
        weather_icon.src = icons[condition] || "img/default.png"; // Use default if condition not listed
    }
};
