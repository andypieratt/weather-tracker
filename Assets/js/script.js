// MOMENT JS VARIABLES
var currentDay = moment();
$("#current-date").text(currentDay.format("MMMM Do, YYYY"));
$("#date-1").text(moment().add(1, "days").format("MMM Do, YYYY"));
$("#date-2").text(moment().add(2, "days").format("MMM Do, YYYY"));
$("#date-3").text(moment().add(3, "days").format("MMM Do, YYYY"));
$("#date-4").text(moment().add(4, "days").format("MMM Do, YYYY"));
$("#date-5").text(moment().add(5, "days").format("MMM Do, YYYY"));

// CURRENT AND FORECAST WEATHER DATA
var currentTemp = document.getElementById("current-temp");

// USER INPUT VARIABLES
var userCity = document.getElementById("city-search").value;

// SEARCH BUTTON VARIABLE
var searchBtn = document.getElementById("search-button");

// HIDE INTIAL IMAGES UNTIL SEARCH
$("#current-weather-img").hide();
$("#daily-1-img").hide();
$("#daily-2-img").hide();
$("#daily-3-img").hide();
$("#daily-4-img").hide();
$("#daily-5-img").hide();

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
      $("#user-city").text(localStorage.getItem("city", city.name));
      localStorage.setItem("latitude", city.lat);
      localStorage.setItem("longitude", city.lon);
      getCurrentWeather(city.lat, city.lon);
    });
});

// GET WEATHER FUNCTION
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
      localStorage.setItem("todays-temp", weather.current.temp);
      // CURRENT WEATHER IMAGE
      var iconURLStart = "https://openweathermap.org/img/wn/";
      var iconURLEnd = "@2x.png";
      localStorage.setItem("current-img", weather.current.weather[0].icon);
      $("#current-weather-img")
        .attr(
          "src",
          iconURLStart + weather.current.weather[0].icon + iconURLEnd
        )
        .show();
      // CURRENT TEMPERATURE
      $("#current-temp").text(
        "Current Temp: " +
          localStorage.getItem("todays-temp", weather.current.temp) +
          "°F"
      );
      // CURRENT HUMIDITY
      localStorage.setItem("todays-humidity", weather.current.humidity);
      $("#current-humidity").text(
        "Current Humidity: " + weather.current.humidity + "%"
      );
      // CURRENT WIND
      localStorage.setItem("todays-wind", weather.current.wind_speed);
      $("#current-wind").text(
        "Current Wind-Speed: " + weather.current.wind_speed + "MPH"
      );
      // CURRENT UV INDEX
      localStorage.setItem("todays-uvi", weather.current.uvi);
      $("#current-uvi").text("Current UV-Index: " + weather.current.uvi);

      // FORECAST DAY-1
      // SETTING LOCAL STORAGE FOR FORECAST DAY-1
      localStorage.setItem("day1-temp", weather.forecast[0].temp.day);
      localStorage.setItem("day1-humidity", weather.forecast[0].humidity);
      localStorage.setItem("day1-wind", weather.forecast[0].wind_speed);
      localStorage.setItem("day1-uvi", weather.forecast[0].uvi);
      localStorage.setItem("day1-img", weather.forecast[0].weather[0].icon);

      // UPDATING HTML WITH STORED VALUES DAY-1
      $("#daily-1-img")
        .attr(
          "src",
          iconURLStart + weather.forecast[0].weather[0].icon + iconURLEnd
        )
        .show();
      $("#daily-1-temp").text("Temp: " + weather.forecast[0].temp.day + "°F");
      $("#daily-1-humidity").text(
        "Humidity: " + weather.forecast[0].humidity + "%"
      );
      $("#daily-1-wind").text(
        "Humidity: " + weather.forecast[0].wind_speed + "MPH"
      );
      $("#daily-1-uvi").text("UV-Index: " + weather.forecast[0].uvi);

      // FORECAST DAY-2
      // SETTING LOCAL STORAGE FOR FORECAST DAY-2
      localStorage.setItem("day2-temp", weather.forecast[1].temp.day);
      localStorage.setItem("day2-humidity", weather.forecast[1].humidity);
      localStorage.setItem("day2-wind", weather.forecast[1].wind_speed);
      localStorage.setItem("day2-uvi", weather.forecast[1].uvi);
      localStorage.setItem("day2-img", weather.forecast[1].weather[0].icon);

      // UPDATING HTML WITH STORED VALUES DAY-2
      $("#daily-2-img")
        .attr(
          "src",
          iconURLStart + weather.forecast[1].weather[0].icon + iconURLEnd
        )
        .show();
      $("#daily-2-temp").text("Temp: " + weather.forecast[1].temp.day + "°F");
      $("#daily-2-humidity").text(
        "Humidity: " + weather.forecast[1].humidity + "%"
      );
      $("#daily-2-wind").text(
        "Humidity: " + weather.forecast[1].wind_speed + "MPH"
      );
      $("#daily-2-uvi").text("UV-Index: " + weather.forecast[1].uvi);

      // FORECAST DAY-3
      // SETTING LOCAL STORAGE FOR FORECAST DAY-3
      localStorage.setItem("day3-temp", weather.forecast[2].temp.day);
      localStorage.setItem("day3-humidity", weather.forecast[2].humidity);
      localStorage.setItem("day3-wind", weather.forecast[2].wind_speed);
      localStorage.setItem("day3-uvi", weather.forecast[2].uvi);
      localStorage.setItem("day3-img", weather.forecast[2].weather[0].icon);

      // UPDATING HTML WITH STORED VALUES DAY-3
      $("#daily-3-img")
        .attr(
          "src",
          iconURLStart + weather.forecast[2].weather[0].icon + iconURLEnd
        )
        .show();
      $("#daily-3-temp").text("Temp: " + weather.forecast[2].temp.day + "°F");
      $("#daily-3-humidity").text(
        "Humidity: " + weather.forecast[2].humidity + "%"
      );
      $("#daily-3-wind").text(
        "Humidity: " + weather.forecast[2].wind_speed + "MPH"
      );
      $("#daily-3-uvi").text("UV-Index: " + weather.forecast[2].uvi);

      // FORECAST DAY-4
      // SETTING LOCAL STORAGE FOR FORECAST DAY-4
      localStorage.setItem("day4-temp", weather.forecast[3].temp.day);
      localStorage.setItem("day4-humidity", weather.forecast[3].humidity);
      localStorage.setItem("day4-wind", weather.forecast[3].wind_speed);
      localStorage.setItem("day4-uvi", weather.forecast[3].uvi);
      localStorage.setItem("day4-img", weather.forecast[3].weather[0].icon);

      // UPDATING HTML WITH STORED VALUES DAY-4
      $("#daily-4-img")
        .attr(
          "src",
          iconURLStart + weather.forecast[3].weather[0].icon + iconURLEnd
        )
        .show();
      $("#daily-4-temp").text("Temp: " + weather.forecast[3].temp.day + "°F");
      $("#daily-4-humidity").text(
        "Humidity: " + weather.forecast[3].humidity + "%"
      );
      $("#daily-4-wind").text(
        "Humidity: " + weather.forecast[3].wind_speed + "MPH"
      );
      $("#daily-4-uvi").text("UV-Index: " + weather.forecast[3].uvi);

      // FORECAST DAY-5
      // SETTING LOCAL STORAGE FOR FORECAST DAY-5
      localStorage.setItem("day5-temp", weather.forecast[4].temp.day);
      localStorage.setItem("day5-humidity", weather.forecast[4].humidity);
      localStorage.setItem("day5-wind", weather.forecast[4].wind_speed);
      localStorage.setItem("day5-uvi", weather.forecast[4].uvi);
      localStorage.setItem("day5-img", weather.forecast[4].weather[0].icon);

      // UPDATING HTML WITH STORED VALUES DAY-5
      $("#daily-5-img")
        .attr(
          "src",
          iconURLStart + weather.forecast[4].weather[0].icon + iconURLEnd
        )
        .show();
      $("#daily-5-temp").text("Temp: " + weather.forecast[4].temp.day + "°F");
      $("#daily-5-humidity").text(
        "Humidity: " + weather.forecast[4].humidity + "%"
      );
      $("#daily-5-wind").text(
        "Humidity: " + weather.forecast[4].wind_speed + "MPH"
      );
      $("#daily-5-uvi").text("UV-Index: " + weather.forecast[4].uvi);
    });
}

//TUTOR FOR LOOP CAN'T FIGURE OUT FUNCTIONALITY YET
// for (const daily of weather.forecast) {
//   console.log(daily);
//   $("#daily-temp").text("Temp: " + daily.temp.day + "°F");
//   console.log(daily.temp.day);
// }
