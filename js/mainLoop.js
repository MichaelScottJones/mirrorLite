var i = 0;
function mainLoop() {
    updateTime();
    updateBusTime();
    updateWeather();
    //updateUser();
}

var x = setTimeout(mainLoop, 1000);
var myVar = setInterval(mainLoop, 5000);

function updateTime() {
    var now = new Date();
    var hrs = now.getHours();
    var min = now.getMinutes();
    var ampm = hrs >= 12 ? "pm" : "am";
    if (hrs > 12) {
        hrs -= 12;
    } else if (hrs === 0) {
        hrs = 12;
    }
    if (hrs < 10) { hrs = "0" + hrs; }
    if (min < 10) { min = "0" + min; }
    document.getElementById("labelTime").firstChild.nodeValue = hrs + ":" + min + ampm;
}
