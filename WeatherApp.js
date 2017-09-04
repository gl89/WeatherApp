$(document).ready(function() {
  //geolocation variables - works
  //chrome causes problems
  //adblocker causes problems
  var lat;
  var long;
  var url;
  var location;
  var weather;
  var tempF;
  var TempC;
  
  if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {//forgot function(position)
            lon = position.coords.longitude
            lat = position.coords.latitude;
            var url = "https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + lon;
            //console.log(lon);
            //console.log(lat);
            $.getJSON(url, function(data) {
              console.log(data);
              console.log(data.name);
              console.log(data.weather[0].main); //array in a JSON object
              console.log(Math.round(data.main.temp)); //celsius
            })
        });
    }
});