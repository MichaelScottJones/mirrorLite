var weatherUrl = "https://api.openweathermap.org/data/2.5/weather?zip=14623,us&appid=f4c9b626b1e7c444ad4c9fc0790d105d";
//var key = "f4c9b626b1e7c444ad4c9fc0790d105d";

function updateWeather() {
    $.ajax({
        type : "GET",
        url : weatherUrl,
        success : function(result) {
            document.getElementById("weatherContainer").style.color = '#000';
            weatherCallback(result);
        },
        error : function(result) {
            console.log("ERROR: could not get weather update");
            document.getElementById("weatherContainer").style.color = '#f00';
        }
    });
}

function weatherCallback(data) {
    //console.log(data);
    if (!data) { return; }
    var temp = data.main.temp;
    temp = (temp - 273.15) * (9/5) + 32;
    document.getElementById("labelTemp").firstChild.nodeValue = "" + Math.round(temp);
    var icon = "";
    var cond = data.weather[0].main;
    switch(cond) {
        case "Haze":
            icon = "wi wi-fog";
            break;
        case "Clouds":
            icon = "wi wi-cloudy";
            break;
        case "Rain":
            icon = "wi wi-rain";
            break;
        case "Snow":
            icon = "wi wi-snow";
            break;
        case "Clear":
            if (isDaytime()) {
                icon = "wi wi-day-sunny";
            } else {
                icon = "wi wi-night-sunny";
            }
            break;
        // case "":
        //     icon = "wi ";
        //     break;
        // case "":
        //     icon = "wi ";
        //     break;
        default:
            console.log("no icon for " + cond)
            break;
    }
    document.getElementById("iconWeather").className = icon;
}


// *********************** HELPER FUNCTIONS *****************************

function isDaytime() {
    var time = new Date().getHours();
    return time > 6 && time < 18;
}