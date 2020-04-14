    var apiKey = "84812982b10af876dab44397bb670d34";
    var lon = "";
    var lat = "";
    var city = "Irvine";
    var count;
    if(localStorage.getItem("count") == null){
        localStorage.setItem("count", 0);
        count = 0;
    }
    else{
        count = parseInt(localStorage.getItem("count"));
        city = localStorage.getItem("local"+count);
    }


    runWeather();

    $("#searchBtn").on("click", function(){
        city = $("#searchInput").val();
        runWeather();
        count = parseInt(localStorage.getItem("count"));
        if (count > 7){
            count = 0;
            localStorage.setItem("count", 0);
        }
        else{
            count++;
            localStorage.setItem("count", count);
        }
        $("#searchInput").val("");
    })
    
    $(".historyCity").on("click", function(){
        city = this.textContent;
        runWeather();
    })

function refreshHistory(){
    for (var i = 0; i < 7 ;i++){
        $("#storage"+i).text(localStorage.getItem("local"+i));
    }
}

function cityStorage (cityName){
    var store = localStorage.getItem("local"+count);
    localStorage.setItem("local"+count, cityName);
    city = localStorage.getItem("local"+count);
}


function runWeather(){
    refreshHistory();
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey + "&units=imperial";
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response){

        var newCity = response.name;
        cityStorage(newCity);
    
        $("#cityName").text(response.name + ", " + response.sys.country);
        $("#condition").text("Condition: " + response.weather[0].description);
        $("#temp").text("Temperature: "+ response.main.temp + " F");
        $("#hum").text("Humidity: " + response.main.humidity);
        $("#wind").text("Wind Speed: " + response.wind.speed);
    
        var icon = response.weather[0].icon;
        $("#icon").attr("src", "http://openweathermap.org/img/wn/" + icon + ".png");
    
        lon = response.coord.lon;
        lat = response.coord.lat;
        
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat="+ lat + "&lon=" + lon + "&appid=" + apiKey + "&units=imperial",
            method: 'GET',
        })
        .then(function (response){

            var day = new moment();
            for (var i = 0; i < 5; i++){
                day = moment().add(i, "d"); 
                $("#day"+i).text(day.format("MMM D"));

                var dayIcon = response.daily[i].weather[0].icon;
                $("#condition"+i).attr("src", "http://openweathermap.org/img/wn/" + dayIcon + ".png");

                $("#info"+i).text(
                    " Temp: " + response.daily[i].temp.day + " F" +
                    " Humidity: " + response.daily[i].humidity
                );
            }
        })
    })

}