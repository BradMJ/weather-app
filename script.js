async function weatherForecast() {
  try {
    const key = "c66e6fe4ffc3496a843151235243103";
    let tempMeasurement = "°F";
    let windMeasurement = "mph";
    let location = document.querySelector("#location-input").value;
    if (!location) {location = "Los Angeles"};

    const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=${key}&q=${location}&days=3&aqi=no&alerts=no`, {
      mode: "cors"
    });

    const result = await response.json();

    console.log(result);

    let city = result.location.name;
    let region = result.location.region;
    let country = result.location.country;
    let fullLocation;
    if (region == "") {
      fullLocation = `${city}, ${country}`
    } else {
      fullLocation = `${city}, ${region}, ${country}`
    }

    document.querySelector("#weather-info-description").innerText = result.current.condition.text;
    document.querySelector("#weather-info-city").innerText = fullLocation;
    document.querySelector("#weather-info-date").innerText = result.location.localtime.toString().slice(5,10) + "-" + result.location.localtime.toString().slice(0,4);
    const currentTime = result.location.localtime.toString().slice(11,16);
    document.querySelector("#weather-info-time").innerText = formatTime(currentTime);
    document.querySelector("#weather-info-temp").innerText = Math.round(result.current.temp_f) + tempMeasurement;
    document.querySelector("#weather-info-icon").src = getWeatherIcon(result.current.condition.icon);
    document.querySelector("#feels-like-temp").innerText = Math.round(result.current.feelslike_f) + tempMeasurement;
    document.querySelector("#humidity-percent").innerText = `${result.current.humidity}%`;
    document.querySelector("#chance-rain-percent").innerText = `${result.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    document.querySelector("#wind-speed").innerText = Math.round(result.current.wind_mph) + ` ${windMeasurement} ${result.current.wind_dir}`;

    document.querySelector("#day-one-forecast-date").innerText = result.forecast.forecastday[0].date.slice(5,10) + "-" + result.forecast.forecastday[0].date.slice(0,4);
    document.querySelector("#day-one-forecast-icon").src = getWeatherIcon(result.forecast.forecastday[0].day.condition.icon);
    document.querySelector("#day-one-forecast-description").innerText = result.forecast.forecastday[0].day.condition.text;
    document.querySelector("#day-one-forecast-high").innerText = "High: " + Math.round(result.forecast.forecastday[0].day.maxtemp_f) + tempMeasurement;
    document.querySelector("#day-one-forecast-low").innerText = "Low: " + Math.round(result.forecast.forecastday[0].day.maxtemp_f) + tempMeasurement;
    document.querySelector("#day-one-forecast-chance-rain").innerText = `Rain Chance: ${result.forecast.forecastday[0].day.daily_chance_of_rain}%`;

    document.querySelector("#day-two-forecast-date").innerText = result.forecast.forecastday[1].date.slice(5,10) + "-" + result.forecast.forecastday[1].date.slice(0,4);
    document.querySelector("#day-two-forecast-icon").src = getWeatherIcon(result.forecast.forecastday[1].day.condition.icon);
    document.querySelector("#day-two-forecast-description").innerText = result.forecast.forecastday[1].day.condition.text;
    document.querySelector("#day-two-forecast-high").innerText = "High: " + Math.round(result.forecast.forecastday[1].day.maxtemp_f) + tempMeasurement;
    document.querySelector("#day-two-forecast-low").innerText = "Low: " + Math.round(result.forecast.forecastday[1].day.maxtemp_f) + tempMeasurement;
    document.querySelector("#day-two-forecast-chance-rain").innerText = `Rain Chance: ${result.forecast.forecastday[1].day.daily_chance_of_rain}%`;

    document.querySelector("#day-three-forecast-date").innerText = result.forecast.forecastday[2].date.slice(5,10) + "-" + result.forecast.forecastday[2].date.slice(0,4);
    document.querySelector("#day-three-forecast-icon").src = getWeatherIcon(result.forecast.forecastday[2].day.condition.icon);
    document.querySelector("#day-three-forecast-description").innerText = result.forecast.forecastday[2].day.condition.text;
    document.querySelector("#day-three-forecast-high").innerText = "High: " + Math.round(result.forecast.forecastday[2].day.maxtemp_f) + tempMeasurement;
    document.querySelector("#day-three-forecast-low").innerText = "Low: " + Math.round(result.forecast.forecastday[2].day.maxtemp_f) + tempMeasurement;
    document.querySelector("#day-three-forecast-chance-rain").innerText = `Rain Chance: ${result.forecast.forecastday[2].day.daily_chance_of_rain}%`;

  } catch (err) {
    console.log("THERE WAS AN ERROR!");
    console.log(err);
    alert("No location found. You must enter a valid City or US Zip Code.");
  };
}

function formatTime(timeString) {
  const [hourString, minute] = timeString.split(":");
  const hour = +hourString % 24;
  return (hour % 12 || 12) + ":" + minute + (hour < 12 ? "AM" : "PM");
}

function getWeatherIcon(iconUrl) {
  const relativePath = iconUrl.slice(20,);
  return `./images${relativePath}`;
}

// Allows 'Enter' key to search location
document.querySelector("#location-input").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    weatherForecast();
    document.querySelector("#location-input").value = "";
  };
})

document.querySelector("#location-search-btn").addEventListener("click", () => {
  weatherForecast();
  document.querySelector("#location-input").value = "";
})

document.addEventListener("DOMContentLoaded", () => {
  weatherForecast();
})