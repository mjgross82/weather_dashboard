// Wait until document fully loads to run script
$(document).ready(function() {

    // OpenWeather API Key and URL
    var APIKey = "f7298ae521ac0931bc7a0c7fed9d21ad";
    var city = "Salt Lake City";
    var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    var futureURL = "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey;
    getWeather();

    // Function to call the API using the city named in var City
    function getWeather() {
        $.ajax({
            url: todayURL,
            method: "GET"
          }).then(function(response) {
            console.log(response);
            // Convert temperature Kelvin to Fahrenheit
            var degrees = Math.round((response.main.temp - 273.15) * 1.8 +32);
            console.log(degrees);
            // Populate today's forecast
            var city = response.name;
            $("#todayTemp").text(degrees + "° F");
            $("#todayLocale").text(city + " DATE");
            $("#todayHumid").text("Humidity: " + response.main.humidity + "%");
            $("#todayWind").text("Wind Speed: " + response.wind.speed + " MPH");
        });
    };    
});