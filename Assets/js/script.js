// MOMENT JS VARIABLES
var currentDay = moment();
$("#current-date").text(currentDay.format("MMMM Do, YYYY"));

// CURRENT AND FORECAST WEATHER DATA
var currentWeatherURL =
  "https://api.openweathermap.org/data/2.5/onecall?lat={GET LAT VAR}&lon{GET LON VAR}&exclude=minutely,hourly,daily,alerts&appid=035e64d4cce284ef774e18d498588393";

// USER INPUT VARIABLES
var userCity = document.getElementById("city-search");

// SEARCH BUTTON VARIABLE
var searchBtn = document.getElementById("search-button");

// SEARCH BUTTON EVENT LISTENER

searchBtn.addEventListener("click", function () {
  localStorage.clear();
});
