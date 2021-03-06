function processData(input) {
    let lines = input.split("\n");
    let truckLocation = lines[0].split(",");
    let distance = parseFloat(lines[1]);
    let truck = {
        lat: parseFloat(truckLocation[0]),
        lon: parseFloat(truckLocation[1]),
    };
    let clients = {};
    let header = lines[2].split(',');
    let columns = {
        dt: header.indexOf('Date&Time'),
        lat: header.indexOf('Latitude'),
        lon: header.indexOf('Longitude'),
        phone: header.indexOf('PhoneNumber')
    };

    lines.shift();
    lines.shift();
    lines.shift();
    lines.forEach(line => {
        try {
        let details = line.split(',');
        let client = clients[details[columns.phone]];
        let datecol = details[columns.dt];
        let parts = datecol.split(" ");
        let left = parts[0].split("/");
        let right = parts[1].split(":");
        let date = new Date(left[2], left[0], left[1], right[0], right[1]);
        if (client) {
            if (client.time < date) {
                client.time = date;
                client.lat = parseFloat(details[columns.lat]);
                client.lon = parseFloat(details[columns.lon]);
            }
        } else {
            clients[details[columns.phone]] = {
                time: date,
                lat: parseFloat(details[columns.lat]),
                lon: parseFloat(details[columns.lon])
            }
        }
        } catch(e) {

        }
    });


    let results = [];

    Object.keys(clients).forEach(key => {
        if (haversine({latitude: truck.lat, longitude: truck.lon}, {latitude: clients[key].lat, longitude: clients[key].lon}) <= distance) {
            results.push(parseInt(key));
        }
    });

    console.log(results.sort((a, b) => a-b).join(','))
}

function toRad(num) {
    return num * Math.PI / 180
}

function haversine(start, end) {


    var R = 6378.137;

    var dLat = toRad(end.latitude - start.latitude);
    var dLon = toRad(end.longitude - start.longitude);
    var lat1 = toRad(start.latitude);
    var lat2 = toRad(end.latitude);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c
}

var fs = require('fs');

processData(fs.readFileSync('inp.txt', "utf-8"));