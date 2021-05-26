const fs = require('fs');

const fl = fs.readFileSync('test.txt', 'utf8');
const flArray = fl.split(' ')

let numberOfSoftwireEmails = 0;
for (let i = 0; i < flArray.length; i++) {
    if (flArray[i].includes('@softwire.com') ) {
        numberOfSoftwireEmails++
    }
}

console.log(numberOfSoftwireEmails)
