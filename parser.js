const fs = require('fs');
const { domain } = require('process');

const fl = fs.readFileSync('test.txt', 'utf8');
const flArray = fl.split(' ')

let dict = new Object();
let domainList = [];

let domainSearch = new RegExp('.@(.*\..*)')

const pickHighest = (obj, num = 1) => {
    const requiredObj = {};
    if (num > Object.keys(obj).length) {
        return false;
    };
    Object.keys(obj).sort((a, b) => obj[b] - obj[a]).forEach((key, ind) => {
        if (ind < num) {
            requiredObj[key] = obj[key];
        }
    });
    return requiredObj;
};


for (let i = 0; i < flArray.length; i++) {
    let domain = flArray[i].match(domainSearch);
    if (domain) {
        domainList.push(domain[1])
    }
}

let domainSet = new Set(domainList)
//use to make object keys
for (let item of domainSet) {
    dict[item] = 0;
}

// loop back through and count up different domains
for (let i = 0; i < flArray.length; i++) {
    for (let item of domainSet) {
        if (flArray[i].match('.*@' + item)) {
            dict[item]++;
        }
    }
}

console.log(pickHighest(dict, 10));
