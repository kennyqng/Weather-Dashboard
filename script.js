

    var apiKey = "84812982b10af876dab44397bb670d34";
    var lon = "";
    var lat = "";

$("#searchBtn").on("click", function(){
    var city = "Garden Grove";
    // $("#searchInput").val();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response){
        // console.log(queryURL);
        // console.log(response);
    
        $("#cityName").text(response.name + ", " + response.sys.country);
        $("#condition").text(response.weather[0].description);
        $("#temp").text("Temperature: "+ response.main.temp + " F");
        $("#hum").text("Humidity: " + response.main.humidity);
        $("#wind").text("Wind Speed: " + response.wind.speed);
    
        var icon = response.weather[0].icon;
        $("#icon").attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");

        lon = response.coord.lon;
        lat = response.coord.lat;

        console.log("lon: " + lon + " lat: " + lat);

        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial",
            method: 'GET',
        })
        .then(function (response){
            console.log(response);
            

        })
    })

})




// function tempF (k){
//     var f = (k - 273.15) * (9/5) + 32;
//     var rounded = f.toFixed(2);
//     return rounded;
// }