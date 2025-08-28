let api = {
    key: "f2dd7f691d65485997a26cce8851be56",
    base: "https://api.openweathermap.org/data/2.5/"
}

const weatherCard = document.getElementById("weather-card");
const topCard = document.getElementById("top-card");
const bottomCard = document.getElementById("bottom-card");

let btn = document.getElementById("search-btn");
let input = document.getElementById("city-input");
let city = "pune";


getWeather("Pune");  // Default City Weather

function getCloudImage(weatherMain) {
    switch (weatherMain) {
        case 'Clear':      return 'bright-sun.png';
        case 'Clouds':     return 'light-cloud.png';
        case 'Rain':       return 'rain-cloud.png';
        case 'Drizzle':    return 'drizzle-cloud.png';
        case 'Thunderstorm': return 'thunder-cloud.png';
        case 'Snow':       return 'snow-cloud.png';
        case 'Mist':       return 'mist-cloud.png';
        case 'Smoke':      return 'smoke-cloud.png';
        case 'Haze':       return 'haze-cloud.png';
        case 'Dust':       return 'dust-cloud.png';
        case 'Fog':        return 'fog-cloud.png';
        case 'Sand':       return 'sand-cloud.png';
        case 'Ash':        return 'ash-cloud.png';
        case 'Squall':     return 'windy-cloud.png';
        case 'Tornado':    return 'tornado-cloud.png';
        default:           return 'weather-forecast.png';
    }
}

async function getWeather(city) {
    try {
        const response = await fetch(`${api.base}weather?q=${city}&units=metric&appid=${api.key}`)
        const data = await response.json();
        console.log(data);

        if (data.cod == 200) {
            let weatherMain = data.weather[0].main;
            let imgSrc = `assets/clouds/${getCloudImage(weatherMain)}`;
            let country = data.sys.country ? `, ${data.sys.country}` : "";
            topCard.innerHTML = `
                <div class="location-date">
                    <div style="display:inline;" class="country-city hover-underline"><span class="city">${data.name}</span>${country}</div>
                    <div class="date">${dateBuilder(new Date())}</div>
                </div>
                <div class="temp">
                    <div class="value">
                        <div>${Math.round(data.main.temp)}°C</div>
                        <div style="background-image: url(${imgSrc})"></div>
                    </div>
                    <div class="desc">
                        <div>${data.weather[0].main}</div>
                        <div>${capeitalizeFirstLetter(data.weather[0].description)}</div>
                    </div>
                </div>
                <div class="min-max">
                    <span>High ${Math.round(data.main.temp_max)}°</span><span>Low ${Math.round(data.main.temp_min)}°</span>
                </div>`;
            bottomCard.innerHTML = `
                <div class="humidity">
                    <span class="title">Humidity</span>
                    <span class="value">${data.main.humidity}%</span>
                </div>
                <div class="pressure">
                    <span class="title">Pressure</span>
                    <span class="value">${data.main.pressure} hPa</span>
                </div>
                <div class="wind">
                    <span class="title">Wind</span>
                    <span class="value">${Math.round(((data.wind.speed) * 3600) / 1000)} kmph</span>
                </div>`;
                weatherCard.innerHTML = `<div id="top-card">${topCard.innerHTML}</div> <div id="bottom-card">${bottomCard.innerHTML}</div>`;
            return;
        } else {
            weatherCard.innerHTML = `<h3>${capeitalizeFirstLetter(data.message)}!</h3>`;
            alert("Pleae enter a valid city name");
            return;
        }
    } catch (error) {
        weatherCard.innerHTML = `<h3>Something went wrong.</h3>`;
        console.error("Error:", error.message);
    }
}

function capeitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

function dateBuilder(d) {
    let months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${date} ${month} ${year}`;
}

function getCityWeather() {
    city = (input.value).trim();
    if (city.length == 0) {
        alert("Please enter a city name");
        return;
    }
    console.log(`Input string: ${city}`);
    getWeather(city);
}

btn.addEventListener("click", function() {
    getCityWeather();
});

input.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getCityWeather()
    }
});