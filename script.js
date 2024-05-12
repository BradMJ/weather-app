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

    document.querySelector("#weather-info-description").innerText = result.current.condition.text;
    document.querySelector("#weather-info-city").innerText = `${result.location.name}, ${result.location.region}`;
    
    // TURN BELOW INTO FUNCTION
    // const currentDate = result.location.localtime.toString().slice(5,10) + "-" + result.location.localtime.toString().slice(0,4);
    // document.querySelector("#weather-info-date").innerText = currentDate;
    // USE FUNCTION ABOVE
    
    // TURN BELOW INTO FUNCTION
    // const currentTime = result.location.localtime.toString().slice(11,16);
    // const timeTo12Hour = formatTime(currentTime);
    // document.querySelector("#weather-info-time").innerText = timeTo12Hour;
    // USE FUNCTION ABOVE

    document.querySelector("#weather-info-temp").innerText = Math.round(result.current.temp_f) + tempMeasurement;
    // document.querySelector("#weather-info-icon").src = getWeatherIcon(result.current.condition.icon);
    document.querySelector("#feels-like-temp").innerText = Math.round(result.current.feelslike_f) + tempMeasurement;
    document.querySelector("#humidity-percent").innerText = `${result.current.humidity}%`;
    document.querySelector("#chance-rain-percent").innerText = `${result.forecast.forecastday[0].day.daily_chance_of_rain}%`;
    document.querySelector("#wind-speed").innerText = Math.round(result.current.wind_mph) + ` ${windMeasurement} ${result.current.wind_dir}`;


  } catch (err) {
    console.log("THERE WAS AN ERROR!");
    console.log(err);
    alert("No location found. You must enter a valid City or US Zip Code.");
  };
}

document.addEventListener("DOMContentLoaded", () => {
  weatherForecast();
});