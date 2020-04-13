

    var apiKey = "84812982b10af876dab44397bb670d34";
    var lon = "";
    var lat = "";
    var count = 0;
    var city = "Garden Grove";

    runWeather();

    $("#searchBtn").on("click", function(){
        city = $("#searchInput").val();
        runWeather();
        count++;
        if (count > 10){
            count = 0;
        }
    })

function cityStorage (){
    var store = localStorage.getItem("local"+count);
    localStorage.setItem("local"+count, $("#searchInput").val());
    var newBlock = $("<p>").text(store);
    $("#history").prepend(newBlock);
}


function runWeather(){
    cityStorage();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response){
        // console.log(queryURL);
        console.log(response);
    
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
            var day = new moment();
            for (var i = 0; i < 5; i++){
                day = moment().add(i, "d"); 
                $("#day"+i).text(day.format("MMM D"));

                var dayIcon = response.daily[i].weather[0].icon;
                $("#condition"+i).attr("src", "http://openweathermap.org/img/wn/" + dayIcon + ".png");

                $("#info"+i).text(
                    " Temp: " + response.daily[i].temp.day +
                    " Humidity: " + response.daily[i].humidity
                );
            }
        })
    })

}


// function tempF (k){
//     var f = (k - 273.15) * (9/5) + 32;
//     var rounded = f.toFixed(2);
//     return rounded;
// }