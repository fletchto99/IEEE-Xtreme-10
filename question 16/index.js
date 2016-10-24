function processData(input) {
    var lines = input.split('\n');
    lines.shift();
    lines.forEach(line => {
        let parts = line.split(" ");
        let numReplace = parseInt(parts[0]);
        let str = parts[1];

        if (str.length % 2 == 0) {
            let front = str.substr(0, str.length/2);
            let back = str.substr(str.length/2+1);
        } else {
            let front = str.substr(0, str.length / 2);
            let middle = str.charAt(str.length/2);
            let back = str.substr(str.length / 2 + 1);

            if ()
        }
    })
}

var fs = require('fs');

processData(fs.readFileSync('inp.txt', "utf-8"));