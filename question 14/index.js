

function processData(input) {
    var lines = input.split('\n');
    let soldiers = [];
    let camps = [];

    let n = parseInt(lines.shift());
    for(let i = 0; i < n; i++) {
        let coords = lines.shift().split(" ").map(item => parseFloat(item));
        soldiers.push({
            id: i,
            x: coords[0],
            y: coords[1]
        })
    }

    for (let i = 0; i < n; i++) {
        let coords = lines.shift().split(" ").map(item => parseFloat(item));
        camps.push({
            id: i,
            x: coords[0],
            y: coords[1],
            soldier: null,
            distance: null
        })
    }

    let totalDist = 0;
    let maximalDist = -999999999;

    var distances = [];

    soldiers.forEach(soldier => {
        camps.forEach(camp => {
            distances.push({
                soldier: soldier,
                camp: camp,
                distance: Math.sqrt((soldier.x - camp.x) * (soldier.x - camp.x) + (soldier.y - camp.y) * (soldier.y - camp.y))
            })
        })
    });

    distances.sort((a, b) => a.distance - b.distance);

    let chosen = [];

    distances.forEach(distance => {
        let found = false;
        chosen.forEach(chosen => {
            if (chosen.soldier.id == distance.soldier.id || chosen.camp.id == distance.camp.id) {
                found = true;
            }
        });
        if (!found) {
            chosen.push(distance);
        }
    });

    chosen.forEach(chosen => {
        totalDist += chosen.distance;
        if (chosen.distance > maximalDist) {
            maximalDist = chosen.distance;
        }
    });

    console.log(maximalDist);
    console.log(totalDist);
}

function checkNested(obj /*, level1, level2, ... levelN*/) {
    var args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0; i < args.length; i++) {
        if (!obj || !obj.hasOwnProperty(args[i])) {
            return false;
        }
        obj = obj[args[i]];
    }
    return true;
}

var fs = require('fs');

processData(fs.readFileSync('inp.txt', "utf-8"));