// MOMENT JS VARIABLES
var currentDay = moment();
$("#current-date").text(currentDay.format("MMMM Do, YYYY"));

// API KEY FOR OPENWEATHER API
//  035e64d4cce284ef774e18d498588393

// CURRENT AND FORECAST WEATHER DATA
// var currentWeatherURL =

// USER INPUT VARIABLES
var userCity = document.getElementById("city-search").value;

// SEARCH BUTTON VARIABLE
var searchBtn = document.getElementById("search-button");

// SEARCH BUTTON EVENT LISTENER

searchBtn.addEventListener("click", function () {
  localStorage.clear();
  var userCity = document.getElementById("city-search").value;
  var startUrl = "https://api.openweathermap.org/geo/1.0/direct?q=";
  var endUrl = "&limit=10&appid=035e64d4cce284ef774e18d498588393";
  var getLatAndLon = startUrl + userCity + endUrl;

  // FETCH LATITUDE AND LONGITUDE FOR USER CITY
  fetch(getLatAndLon)
    .then(function (response) {
      return response.json();
    })
    .then(function (cities) {
      return cities[0];
    })
    .then(function (city) {
      console.log(city);

      localStorage.setItem("city", city.name);
      localStorage.setItem("latitude", city.lat);
      localStorage.setItem("longitude", city.lon);
      getCurrentWeather(city.lat, city.lon);
    });
});

function getCurrentWeather(lat, lon) {
  var urlBase = "https://api.openweathermap.org/data/2.5/onecall";
  var searchParams = new URLSearchParams({
    lat,
    lon,
    exclude: "minutely,hourly,alerts",
    units: "imperial",
    appid: "035e64d4cce284ef774e18d498588393",
  });

  var requestURL = `${urlBase}?${searchParams}`;

  // FETCH REQUEST FOR API DATA
  fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (rawWeather) {
      return {
        current: rawWeather.current,
        forecast: rawWeather.daily.slice(1, 6),
      };
    })
    .then(function (weather) {
      console.log(weather);
      for (const daily of weather.forecast) {
        console.log(daily);
      }
    });
}
