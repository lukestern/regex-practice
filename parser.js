const fs = require('fs');

const fl = fs.readFileSync('test.txt', 'utf8');
const flArray = fl.split(' ')

let numberOfSoftwireEmails = 0;
let search = new RegExp('.@softwire\.com');
for (let i = 0; i < flArray.length; i++) {
    if (flArray[i].match(search)) {
        numberOfSoftwireEmails++
    }
}

console.log(numberOfSoftwireEmails)
