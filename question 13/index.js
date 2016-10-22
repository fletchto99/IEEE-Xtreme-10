function processData(input) {
    var lines = input.split('\n');
    lines.shift();
    lines.pop();
    lines.forEach(flower => {
        let pedals = [parseInt(flower)];
        console.log((remaining(pedals, 2) + 1));
    })
}

function remaining(n, k){
    let r = 0;
    for (let i = 2; i <= n; i++) {
        r = (r + k) % i;
    }
    return r;
}


var fs = require('fs');

processData(fs.readFileSync('inp.txt', "utf-8"));