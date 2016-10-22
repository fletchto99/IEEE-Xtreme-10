function processData(input) {
    let sets = input.substr(1).split("\n").filter((inp) => inp != "");
    sets.forEach(set => {

        let nums = set.split(" ");

        let a = parseInt(nums[0]);
        let b = parseInt(nums[1]);
        let c = parseInt(nums[2]);

        let ans = 0;
        for(let i = b; i <= c; i++){
            if (isPrime(i)) {
                ans += i;
            } else if (coPrime(a, i)) {
                ans += i;
            }
        }
        console.log(ans % 1000000007)
    })
}

function isPrime(number) {
    var start = 2;
    while (start <= Math.sqrt(number)) {
        if (number % start++ < 1) return false;
    }
    return number > 1;
}

function coPrime(u, v) {
    {
        if (((u | v) & 1) == 0) return false;

        while ((u & 1) == 0) u >>= 1;
        if (u == 1) return true;

        do {
            while ((v & 1) == 0) v >>= 1;
            if (v == 1) return true;

            if (u > v) {
                let t = v;
                v = u;
                u = t;
            }
            v -= u;
        } while (v != 0);

        return false;
    }
}

var fs = require('fs');
processData(fs.readFileSync('inp.txt', "utf-8"));