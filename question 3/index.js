function processData(input) {
    let sets = input.substr(1).split("\n").filter((inp) => inp != "");
    sets.forEach(set => {

        let nums = set.split(" ");

        let n = parseInt(nums[0]);
        let a = parseInt(nums[1]);
        let b = parseInt(nums[2]);
        let sum = 0;

        for(let i = a; a <= b; i++) {
            if (isPrime(i)){
                sum += i;
            } else if (gcd(i, n) == 1) {
                sum += i;
            }
        }
        console.log(sum % 1000000007);
    })
}

function isPrime(number) {
    var start = 2;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return number > 1;
}

function gcd(a, b){
    let t;
    while (b != 0) {
        t = a;
        a = b;
        b = t % b;
    }
    return a;
}

var fs = require('fs');
processData(fs.readFileSync('inp.txt', "utf-8"));