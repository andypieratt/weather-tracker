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
    .then(function (data) {
      console.log(data);

      var lat = data[0].lat;
      var lon = data[0].lon;

      localStorage.setItem("city", userCity);
      localStorage.setItem("latitude", lat);
      localStorage.setItem("longitude", lon);
    });

  // CALLING TO GET THE CURRENT WEATHER INFO ON THE USER'S CITY
  getCurrentWeather();
});

function getCurrentWeather() {
  var lat = localStorage.getItem("lat");
  var lon = localStorage.getItem("lon");
  var urlStart = "https://api.openweathermap.org/data/2.5/onecall?";
  var urlLat = "lat=";
  var urlLon = "&lon=";
  var urlEnd =
    "&exclude=minutely,hourly,daily,alerts&appid=035e64d4cce284ef774e18d498588393";
  var requestURL = urlStart + urlLat + lat + urlLon + lon + urlEnd;

  // FETCH REQUEST FOR API DATA
  fetch(requestURL).then(function (response) {
    return response.json();
  });
}
