$(document).ready(function() {
  var location, lat, long;
  var city, state, country;
  var weather;
  var tempF, tempC;
  
  var icons = new Skycons({ color: "white" }),
    list = [
      "clear-day",
      "clear-night",
      "partly-cloudy-day",
      "partly-cloudy-night",
      "cloudy",
      "rain",
      "sleet",
      "snow",
      "wind",
      "fog"
    ],
    i;

  for (i = list.length; i--; ) {
    icons.set(list[i], list[i]);
  }

  icons.play();

  //CORS problem solution, read up on this
  var proxy = "https://cors-anywhere.herokuapp.com/";

  var geoURL = proxy + "https://ipinfo.io/json";

  $.getJSON(geoURL, function(data) {
    location = data.loc.split(",");
    lat = location[0];
    long = location[1];
    city = data.city;
    state = data.region;
    country = data.country;

    var url =
      proxy +
      "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/f5bb7edc2eaf66143e93a843b6bbd856/" +
      lat +
      "," +
      long;

    $.getJSON(url, function(data) {
      tempF = Math.round(data.currently.temperature);
      tempC = Math.round((tempF - 32) * 5 / 9);
      weathericon = data.currently.icon;
      showIcon(weathericon);
      weather = data.currently.summary;

      $("#tempF").append(tempF + "&deg;F");
      $("#tempC").append(tempC + "&deg;C");
      $("#loc").append(city + " " + state + " , " + country);
      $("#tempF").append(" " + weather);
      $("#tempC").append(" " + weather);
    });

    //For a split second it shows everything should probably use set.
    //Learn to use set
    $(".skycon").hide();

    $("#tempC").hide();
    $("button").click(function() {
      $("#tempF, #tempC").toggle();
    });
  });

  //works, but not the best.
  function showIcon(weathericon) {
    if (weathericon == "fog") {
      $("#fog").show();
    } else if (weathericon == "wind") {
      $("#wind").show();
    } else if (weathericon == "snow") {
      $("#snow").show();
    } else if (weathericon == "sleet") {
      $("#sleet").show();
    } else if (weathericon == "rain") {
      $("#rain").show();
    } else if (weathericon == "cloudy") {
      $("#cloudy").show();
    } else if (weathericon == "clear-day") {
      $("#clear-day").show();
    } else if (weathericon == "clear-night") {
      $("#clear-night").show();
    } else if (weathericon == "partly-cloudy-day") {
      $("#partly-cloudy-day").show();
    } else if (weathericon == "partly-cloudy-night") {
      $("#partly-cloudy-night").show();
    }
  }