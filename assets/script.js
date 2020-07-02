// OpenWeather API Key and URL
var APIKey = "f7298ae521ac0931bc7a0c7fed9d21ad";
var city = "Salt Lake City";

// Populate site with SLC info on site load
getWeather(city);

// Function to show weather based on user input
$("#btnSearch").on("click", function () {
    city = $("#citySearch").val();
    $("#citySearch").val('');
    getWeather(city);
    saveSearch(city);
});

function saveSearch(city) {            
    localStorage.removeItem("4");
    var move3 = localStorage.getItem("3");
    localStorage.setItem("4", move3);
    var move2 = localStorage.getItem("2");
    localStorage.setItem("3", move2);
    var move1 = localStorage.getItem("1");
    localStorage.setItem("2", move1);
    var move0 = localStorage.getItem("0");
    localStorage.setItem("1", move0);
    localStorage.setItem("0",city);
}

// Function to call the API using the city named in var City
function getWeather(city) {
    var todayURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;
    $.ajax({
        url: todayURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // Convert temperature Kelvin to Fahrenheit
        var degrees = Math.round((response.main.temp - 273.15) * 1.8 + 32);
        // Save latitude and longitude in variables to call in forecast API
        var lat = response.coord.lat;
        var lon = response.coord.lon;
        var futureURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&appid=" + APIKey;
        // Populate today's forecast
        icon = response.weather[0].icon;
        iconAlt = response.weather[0].description;
        iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
        $("#todayLocale").text(response.name + " DATE");
        $("#todayTemp").text(degrees + "° F  ");
        $("#todayTemp").append("<img id='wIcon'>");
        $("#wIcon").attr("src", iconURL);
        $("#wIcon").attr("alt", iconAlt);
        $("#todayHumid").text("Humidity: " + response.main.humidity + "%");
        $("#todayWind").text("Wind Speed: " + response.wind.speed + " MPH");
        // Function to call the API for forecast data and populate into HTML
        $.ajax({
            url: futureURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#todayUV").text("UV Index: " + response.current.uvi);
            var daily = response.daily;
            var forecast = [0, 1, 2, 3, 4];
            $.each(forecast, function (value) {
                icon = daily[value].weather[0].icon;
                iconAlt = daily[value].weather[0].description;
                iconURL = "http://openweathermap.org/img/w/" + icon + ".png";
                $("#" + (value + 1) + "icon").attr("src", iconURL);
                $("#" + (value + 1) + "icon").attr("alt", iconAlt);
                var temp = Math.round((daily[value].temp.day - 273.15) * 1.80 + 32);
                $("#" + (value + 1) + "temp").text(temp + "° F");
                $("#" + (value + 1) + "humid").text("Humidity: " + daily[value].humidity + "%")
            });
        });
    });
};