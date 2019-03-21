/*
    BUS UPDATE
    **********
    RIT - agency 643
    Colony Manor stop: 4224626
 */

var routes = {
    "4010124": "Colony Manor/Province",
    "4010132": "Colony Manor",
    "4012156": "Eastside",
    "4012166": "Weekend Eastside"
};
var busUrl = "https://transloc-api-1-2.p.mashape.com/arrival-estimates.json?agencies=643&callback=call&routes=4010124%2C4010132%2C4012156%2C4012166&stops=4224626";

function updateBusTime() {
    $.ajax({
        type : "GET",
        url : busUrl,
        headers: {
            "X-Mashape-Key": "nSHjbzblkZmshk0iKFkcjGumedghp1Cz3ICjsnSI9FFo8bIFpl",
            "Accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        success : function(result) {
            document.getElementById("busContainer").style.color = '#000';
            busCallback(result.data);
        },
        error : function(result) {
            console.log("ERROR: could not get bus update");
            document.getElementById("busContainer").style.color = '#f00';
        }
    });
}

function busCallback(busData) {
    var etaNode = $('#labelBusEta')[0];
    var nameNode = $('#labelBusName')[0];
    if (busData.length === 0) {
        etaNode.firstChild.nodeValue = ":(";
        nameNode.firstChild.nodeValue = "No bus available";
        return;
    }
    var arrivals = busData[0].arrivals;
    var earliest = null;
    for (var i=0; i<arrivals.length; i++) {
        var time = new Date(arrivals[i].arrival_at);
        if (!earliest || time < earliest) {
            earliest = arrivals[i];
        }
    }
    var hourdiff = (new Date(earliest.arrival_at).getHours() - new Date().getHours()) * 60;
    if (hourdiff < 0) { hourdiff = 60; }
    var eta = (hourdiff + new Date(earliest.arrival_at).getMinutes()) - new Date().getMinutes();
    etaNode.firstChild.nodeValue = eta + " min";
    nameNode.firstChild.nodeValue = routes[earliest.route_id];
}
