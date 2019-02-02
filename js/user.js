var userUrl = "http://localhost:8080/user";

function updateUser() {
    $.ajax({
        type : "GET",
        url : userUrl,
        success : function(result) {
            userCallback(result);
        },
        error : function(result) {
            console.log("ERROR: could not get user update");
        }
    });
}

function userCallback(data) {
    var time;
    var hour = new Date().getHours();
    if (hour < 6) {
        time = "night";
    } else if (hour < 12) {
        time = "morning";
    } else if (hour < 17) {
        time = "afternoon";
    } else if (hour < 21) {
        time = "evening";
    } else {
        time = "night";
    }
    var name = data.name === '' ? "" : ", " + data.name;
    document.getElementById("labelName").firstChild.nodeValue = "Good " + time + name;
    //document.getElementById("img").src = "/img/" + data.imgPath;
}