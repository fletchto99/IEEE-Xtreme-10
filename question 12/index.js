function processData(input) {
    var lines = input.split('\n');
    lines.pop();
    let chars = lines[0].split(" ")[1].trim();
    let base = parseInt(lines[0].split(" ")[0]);

    let num1 = lines[1].trim().split("").reverse();
    let num2 = lines[2].substr(1).trim().split("").reverse();
    let carry = 0;

    let result = "";
    let lastIndex = 0;

    if (num1.length >= num2.length) {
        num1.forEach((item, index) => {
            let add1 = chars.indexOf(item);
            let add2 = index < num2.length ? chars.indexOf(num2[index]) : 0;
            let res = add1 + add2 + carry;
            if (res >= base) {
                carry = Math.floor(res / base);
                res %= base;
            } else {
                carry = 0;
            }
            result += chars.charAt(res);
            lastIndex++;
        })
    } else {
        num2.forEach((item, index) => {
            let add1 = chars.indexOf(item);
            let add2 = index < num1.length ? chars.indexOf(num1[index]) : 0;
            let res = add1 + add2 + carry;
            if (res >= base) {
                carry = Math.floor(res / base);
                res %= base;
            } else {
                carry = 0;
            }
            result += chars.charAt(res);
            lastIndex++;
        })

    }

    if (carry > 0) {
        result += chars.charAt(carry);
    }

    result = result.split("").reverse().join("");

    console.log(lines[0]);
    console.log(lines[1]);
    console.log(lines[2]);
    console.log(lines[3]);
    console.log((carry > 0 ? "" : " ") + result);
}

var fs = require('fs');

processData(fs.readFileSync('inp.txt', "utf-8"));