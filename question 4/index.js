

function processData(input) {
    let lines = input.substr(1).split("\n").filter((inp) => inp != "");
    let cases = parse(lines);

    cases.forEach(testCase => {
        let brushA = {
            color: null,
            changes: 0
        };
        let brushB = {
            color: null,
            changes: 0
        };
        testCase.colors.forEach((color, index) => {

            //need to look ahead to see which color to change on which brush

            // console.log(testCase.colors.slice(index));

            let lookaheadA = testCase.colors.slice(index).indexOf(brushA.color || -1);
            let lookaheadB = testCase.colors.slice(index).indexOf(brushB.color || -1);

            if (lookaheadA < 0) {
                lookaheadA = 999999999999;
            }

            if (lookaheadB < 0) {
                lookaheadB = 999999999999;
            }

            if (brushA.color == color || brushB.color == color) {
                //Do nothing...
            } else if (lookaheadA == lookaheadB) {
                if (brushA.changes <= brushB.changes) {
                    brushA.color = color;
                    brushA.changes++;
                } else {
                    brushB.color = color;
                    brushB.changes++;
                }
            } else {
                if (lookaheadA < lookaheadB) {
                    // console.log("hi");
                    brushB.color = color;
                    brushB.changes++;
                } else {

                    brushA.color = color;
                    brushA.changes++;
                }
            }
        });
        console.log(brushA.changes + brushB.changes);
    })
}

function parse(lines) {
    let results = [];
    lines.forEach((line, index) => {
        if (index % 2 == 1) {
            results.push({
                colors: line.split(" ")
            });
        }
    });
    return results;
}

var fs = require('fs');
processData(fs.readFileSync('inp.txt', "utf-8"));