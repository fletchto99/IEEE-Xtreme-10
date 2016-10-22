

function processData(input) {
    var lines = input.split('\n');
    let soldiers = [];
    let camps = [];

    let n = parseInt(lines.shift());
    for(let i = 0; i < n; i++) {
        let coords = lines.shift().split(" ").map(item => parseFloat(item));
        soldiers.push({
            x: coords[0],
            y: coords[1]
        })
    }

    for (let i = 0; i < n; i++) {
        let coords = lines.shift().split(" ").map(item => parseFloat(item));
        camps.push({
            x: coords[0],
            y: coords[1],
            soldier: null,
            distance: null
        })
    }

    let totalDist = 0;
    let shortestDist = 999999999;

    soldiers.forEach(soldier => {
        let chosen = null;
        let distance = 999999999999;
        camps.forEach(camp => {
            if (camp.soldier) {
                return;
            }
            let toCamp = Math.sqrt((soldier.x - camp.x) * (soldier.x - camp.x) + (soldier.y - camp.y) * (soldier.y - camp.y));
            if (toCamp < distance) {
                distance = toCamp;
                chosen = camp;
            }
        });
        chosen.soldier = soldier;
        chosen.distance = distance;
        if (distance < shortestDist) {
            shortestDist = distance;
        }
        totalDist += distance;
    });
    console.log(shortestDist);
    console.log(totalDist);
}

var fs = require('fs');

processData(fs.readFileSync('inp.txt', "utf-8"));