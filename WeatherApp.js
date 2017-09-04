$(document).ready(function() {
  var lat, long;
  var url;
  var location;
  var weather;
  var tempF, tempC;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      lon = position.coords.longitude;
      lat = position.coords.latitude;
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
    });
  }
  
  //This is where I could get better icons 
  //Skycons is amazing, but I have to change my code for that
  $(".icon").hide();
  $(".cloudy").show();

  //jQuery to toggle between Celcius and Fahrenheit
  $("#tempC").hide();
  $("button").click(function() {
    $("#tempF, #tempC").toggle();
  });
});