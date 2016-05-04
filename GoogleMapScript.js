var fs = require('fs');
var rl = require('readline').createInterface({ input: require('fs').createReadStream('./engagement_data.json') });
var request = require('request');

var calculateDeviation = function(x1, y1) {
    var difference;
    if(x1>y1) {
        difference = x1-y1;
    } else {
        difference = y1-x1;
    }
    var deviation = (difference*100)/y1;
    deviation = deviation + " %";
    return deviation;
}

function get_source_at(uri){
    var source;
    request({ uri:uri}, function (error, response, body) {
        source = JSON.parse(body);
    });
    while(source === undefined) {
      require('deasync').runLoopOnce();
    }
    return source;
}

rl.on('line',function(line) {
    var object = JSON.parse(line);
    var resultArray = new Array();
    for(var i=0; i<object.length; i++) {
        var pickupLatitude = object[i].pickup_latitude;
        var pickupLongitude = object[i].pickup_longitude;
        var dropLatitude = object[i].drop_latitude;
        var dropLongitude = object[i].drop_longitude;
        var actualMetredDistance, actualMetredTime;
        
        var key = "AIzaSyAWoH8y1dtQROwmfLhS11N3FV1JMJZyo00" ;
        var url = "https://maps.googleapis.com/maps/api/distancematrix/json?origins="+pickupLatitude+","+pickupLongitude+"&destinations="+dropLatitude+","+dropLongitude+"&key="+key;
        
        var response = get_source_at(url);
        
        var data = {};
        data.engagement_id = object[i]["engagement_id"];
        data.metredDistance = object[i]["metered_distance"];
        data.metredTime = object[i]["metered_time"];
        data.googleMetredDistance = parseFloat(response.rows[0].elements[0].distance.text);
        data.googleMetredTime = parseFloat(response.rows[0].elements[0].duration.text);
        data.distanceDeviation = calculateDeviation(data["metredDistance"], data["googleMetredDistance"]);
        data.timeDeviation = calculateDeviation(data["metredTime"], data["googleMetredTime"]);
        if(parseFloat(data.distanceDeviation)>5 && parseFloat(data.timeDeviation)>10) {
            data.Faulty = "True";
        } else {
            data.Faulty = "False";
        }
        resultArray.push(data);
    }
    
    var jsonResultArray = JSON.stringify(resultArray, null, 2);
//    console.log(jsonResultArray);
    fs.writeFile('./Result.json', jsonResultArray, function(err){
      if(err){
        console.error(err);
      }
    });
});