function processData(input) {
    let data = input.split("\n");
    data.shift();
    data.pop();
    let numgames = -1;
    let count = 0;
    let sum = 0;
    data.forEach(item => {
        if (count == numgames) {
            console.log(sum % 2 == 0 ? "Bob" : "Alice");
            sum = 0;
            count = 0;
        }
        if (count == 0) {
            numgames = (parseInt(item) * 2) + 1;
        } else if (count % 2 == 0) {
            item.split(" ").forEach(item => sum += Math.floor(parseInt(item) / 2));
        }
        count++;
    });
    console.log(sum % 2 == 0 ? "Bob" : "Alice")


}

var fs = require('fs');

processData(fs.readFileSync('inp.txt', "utf-8"));