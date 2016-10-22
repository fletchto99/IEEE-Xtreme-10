function processData(input) {
    let data = input.split("\n").filter(item => item != "");
    let password = data.shift();
    data.shift();
    data.forEach(item => {
        let args = item.split(" ").map(item => parseInt(item));

        args[1] = args[1] - 1;
        args[2] = args[2] - 1;
        args[3] = args[3] - 1;

        if (args[0] == 1) {
            console.log(password.substr(args[1], args[2] - args[1] + 1) == password.substr(args[3], (args[2] - args[1] + 1)) ? 'Y' : 'N');
        } else if (args[0] == 2) {
            password = password.replaceBetween(args[1], args[2] + 1, password.substr(args[3], (args[2] - args[1] + 1)));
        } else if (args[0] == 3) {

            let replacement = "";

            for (let i = args[1]; i <= args[2]; i++) {
                if (password.charAt(i) == 'z') {
                    replacement += 'a';
                } else {
                    replacement += String.fromCharCode(password.charCodeAt(i) + 1);
                }
            }
            password = password.replaceBetween(args[1], args[2] + 1, replacement);
        }
    });
}

String.prototype.replaceBetween = function (start, end, replacement) {
    return this.substring(0, start) + replacement + this.substring(end);
};


var fs = require('fs');
processData(fs.readFileSync('inp.txt', "utf-8"));