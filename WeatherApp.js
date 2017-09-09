$(document).ready(function() {
  var location, lat, long;
  var city, state, country;
  var weather;
  var tempF, tempC;

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
      tempC = Math.round((tempF - 32) * 5 / 9 );
      weatherICON = data.currently.icon;
      weather = data.currently.summary;

      $("#tempF").append(tempF + "&deg;F");
      $("#tempC").append(tempC + "&deg;C");
      $("#loc").append(city + state + country);
      $("#tempF").append(" " + weather);
      $("#tempC").append(" " + weather);
      //$("#weatherICON").append("<img id='icon' src=" + weatherICON + "/>"); this works it's just the icons are UGLY
    });

    $("#tempC").hide();
    $("button").click(function() {
      $("#tempF, #tempC").toggle();
    });
  });

  /*
  //use api for better location
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
      
      var url = 
        proxy + "https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/f5bb7edc2eaf66143e93a843b6bbd856/" + lat + ","+ lon;
      /*
      
      var url =
        "https://fcc-weather-api.glitch.me/api/current?lat=" +
        lat +
        "&lon=" +
        lon;
     
 
      $.getJSON(url, function(data) {
        //console.log(data.weather[0].main); //array in a JSON object
        location = data.name;
        weather = data.weather[0].main;
        weatherICON = data.weather[0].icon;
        tempC = Math.round(data.main.temp);
        tempF = Math.round(tempC * 9 / 5 + 32);
        
        //adds the information to the correct div
        //can be improved for quality of life, but functionally its complete
        $("#tempF").append(tempF + "&deg;F");
        $("#tempC").append(tempC + "&deg;C");
        $("#loc").append(location);
        $("#tempF").append(" " + weather);
        $("#tempC").append(" " + weather);
        //$("#weatherICON").append("<img id='icon' src=" + weatherICON + "/>"); this works it's just the icons are UGLY
      });
      */

  //jQuery to toggle between Celcius and Fahrenheit
});
