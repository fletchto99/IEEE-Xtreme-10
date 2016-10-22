function processData(input) {
    let data = input.split("\n");
    data.pop();
    let password = data.shift();
    data.shift();
    data.forEach(item => {

        let args = item.split(" ").map(item => parseInt(item));

        args[1] = args[1] - 1;
        args[2] = args[2];
        args[3] = args[3] -1;

        if (args[0] == 1) {
            let sub1 = password.substr(args[1], args[2] - args[1]);
            let sub2 = password.substr(args[3], (args[2] - args[1]));
            // console.log("comparing" + sub1 + " to " + sub2);
            console.log(sub1 == sub2 ? 'Y' : 'N');
        } else if (args[0] == 2) {
            let replaceValue = password.substr(args[3], (args[2] - args[1]));
            let index = 0;

            for (let i = args[1]; i < args[2]; i++) {
                password = password.replaceAt(i, replaceValue.charAt(index++));
            }

        } else if (args[0] == 3) {
            for (let i = args[1]; i < args[2]; i++) {
                if (password.charAt(i) == 'z') {
                    password = password.replaceAt(i, 'a')
                } else {
                    password = password.replaceAt(i, String.fromCharCode(password.charCodeAt(i) + 1));
                }
            }
        }
    })
}

String.prototype.replaceAt = function (index, character) {
    return this.substr(0, index) + character + this.substr(index + 1);
}


var fs = require('fs');

processData(fs.readFileSync('inp.txt', "utf-8"));