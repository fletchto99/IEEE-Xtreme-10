function processData(input) {
    let lines = input.substr(2).split("\n").filter((inp) => inp != "");
    let testCases = parse(lines);
    testCases.forEach(test => {
        let currentPagesFIFO = [];
        let currentPagesLRU = [];
        test.accesses.forEach(access => {

            let accessedPage = getAccessedPage(access, test.pagesize);

            if(currentPagesFIFO.indexOf(accessedPage) < 0) {
                if (currentPagesFIFO.length == test.pages) {
                    currentPagesFIFO.shift();
                    test.fifo++;
                }
                currentPagesFIFO.push(accessedPage)
            }

            let lruIndex = currentPagesLRU.indexOf(accessedPage);

            if (lruIndex < 0) {
                if (currentPagesLRU.length == test.pages) {
                    currentPagesLRU.shift();
                    test.lru++;
                }
                currentPagesLRU.push(accessedPage);
            } else {
                currentPagesLRU.splice(currentPagesLRU.indexOf(accessedPage), 1);
                currentPagesLRU.push(accessedPage);
            }
        });
        console.log(`${test.fifo > test.lru ? 'yes' : 'no'} ${test.fifo} ${test.lru}`);
    });

}

function getAccessedPage(access, pagesize) {
    // let block = 0;
    // while(block <= access) {
    //     block += pagesize;
    // }
    // block -= pagesize;
    // return block > 0 ? block/pagesize : 0;
    return Math.floor(access / pagesize);
}

function getAccessedPage2(access, pagesize) {
    return Math.floor(access/pagesize);
    // let block = 0;
    // while (block <= access) {
    //     block += pagesize;
    // }
    // block -= pagesize;
    // return block > 0 ? block / pagesize : 0;
}

function parse(lines) {
    let testCases = [];
    let current = null;
    lines.forEach(line => {
        let nums = line.split(" ").map(item => parseInt(item));
        if (nums.length == 3) {
            if (current != null) {
                testCases.push(current);
            }
            current = {
                pages: nums[0],
                pagesize: nums[1],
                accesses: [],
                lru: 0,
                fifo: 0
            };
        } else {
            current.accesses.push(nums[0]);
        }
    });
    testCases.push(current);
    return testCases;
}

var fs = require('fs');

processData(fs.readFileSync('inp.txt', "utf-8"));

// process.stdin.resume();
// process.stdin.setEncoding("ascii");
// _input = "";
// process.stdin.on("data", function (input) {
//     _input += input;
// });
//
// process.stdin.on("end", function () {
//     processData(_input);
// });
