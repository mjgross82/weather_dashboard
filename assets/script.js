// Wait until document fully loads to run script
$(document).ready(function() {

    // OpenWeather API Key and URL
    var APIKey = "f7298ae521ac0931bc7a0c7fed9d21ad";
    var city = "Salt Lake City";
    var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
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
            // Save latitude and longitude in variables to call in forecast API
            var lat = response.coord.lat;
            var lon = response.coord.lon;
            var futureURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + APIKey;
            // Populate today's forecast
            icon = response.weather[0].icon;
            iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
            $("#todayLocale").text(response.name + " DATE");
            $("#todayTemp").text(degrees + "° F");
            $("#todayHumid").text("Humidity: " + response.main.humidity + "%");
            $("#todayWind").text("Wind Speed: " + response.wind.speed + " MPH");
            // Function to call the API for forecast data and populate into HTML
            $.ajax({
                url: futureURL,
                method: "GET"
              }).then(function(response) {
                console.log(response);
                $("#todayUV").text("UV Index: " + response.current.uvi);
                var daily = response.daily;
                var forecast = [0, 1, 2, 3, 4];
                $.each(forecast, function(value) {
                    var temp = Math.round((daily[value].temp.day - 273.15) * 1.80 + 32);
                    $("#" + (value + 1) + "temp").text(temp + "° F");
                    $("#" + (value + 1) + "humid").text("Humidity: " + daily[value].humidity + "%")
                });
            });
        });
    };    
});