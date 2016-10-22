function processData(input) {
    let sets = input.substr(1).split("\n").filter((inp) => inp != "");
    sets.forEach(set => {

        let nums = set.split(" ");

        let N = parseInt(nums[0]);
        let A = parseInt(nums[1]);
        let B = parseInt(nums[2]);

        let sieve = derp(12);
        console.log(sieve);

        for (o = [], a = 1;prompt(b = 1); b++ < 99; --c || o.push(b))for (c = a, d = b; d;)d = c % (c = d);
        o.join(', ')
        // let suma = derp(A);
        // let sumb = derp(B);
        // let total = sumb - suma;
        // console.log(phi(12));
        // console.log(total % 1000000007)
    })
}

function derp(n) {
    var i, j;
    var prime = new Array(n);
    for (i = 2; i < n; i++) prime[i] = true;

    for (i = 2; i * i < n; i++) {
        if (prime[i]) {
            for (j = 0; i * i + i * j < n; j++) {
                prime[i * i + i * j] = false;
            }
        }
    }

    var cnt = 0;
    for (i = 2; i < n; i++) {
        if (prime[i]) {
            console.log(i);
        }
    }
}

var fs = require('fs');
processData(fs.readFileSync('inp.txt', "utf-8"));