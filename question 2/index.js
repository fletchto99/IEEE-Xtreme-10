var fs = require('fs');

function processData(input) {
    let lines = input.substr(2).split("\n").filter((inp) => inp != "");

    let testCases = parse(lines);

    testCases.forEach(test => {
        // first pass to find obvious lies
        test.questions.forEach(question => {
            if (question.type == 'count') {
                if ((question.red || 0) + (question.blue || 0) + (question.green || 0) > 10 && test.answer == true && test.type == 'join') {
                    test.numLies--;
                    question.lie = true;
                }
            }
        });
    });
}

function parse(lines) {
    let testCases = [];
    let current = null;
    lines.forEach(line => {
        if (!Number.isNaN(parseInt(line.charAt(0)))) {
            if (current != null) {
                testCases.push(current);
            }
            current = {
                questions: [],
                numLies: parseInt(line.charAt(2))
            };
        } else if (line == 'yes' || line == 'no') {
            current.questions[current.questions.length - 1].answer = line == 'yes';
        } else if (line.substr(0, 5) == "color") {
            current.questions.push({
                type: 'color',
                lie: false,
                join: line.indexOf(" or ") > 0 ? 'or' : (line.indexOf(" and ") > 0 ? 'and' : null),
                red: countColors(" r", line),
                green: countColors(" g", line, -1),
                blue: countColors(" b", line, -1)
            });
        } else if (line.substr(0, 5) == 'count') {
            current.questions.push({
                type: 'count',
                lie: false,
                join: line.indexOf(" or ") > 0 ? 'or' : (line.indexOf(" and ") > 0 ? 'and' : null),
                red: parseInt(line.charAt(line.indexOf(" r ") + 3)) || null,
                green: parseInt(line.charAt(line.indexOf(" g ") + 3)) || null,
                blue: parseInt(line.charAt(line.indexOf(" b ") + 3)) || null,
            });
        }
    });
    return testCases;
}

function countColors(searchStr, str) {
    let searchlen = searchStr.length;
    let startIndex = 0, index, results = [];
    str = str.toLowerCase();
    searchStr = searchStr.toLowerCase();
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        results.push(parseInt(str.substr(index - 2, 2).trim()));
        startIndex = index + searchlen;
    }
    return results;
}

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
