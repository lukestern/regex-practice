const fs = require('fs');
const readline = require("readline-sync");

// Read file and make array of words.
const fl = fs.readFileSync('test.txt', 'utf8');
const flArray = fl.split(/[\r\n]+|\s/)

let domainSearch = new RegExp('.@(.*\..*)')

// Function for choosing n highest attributes in an object.
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

const getDomainSet = () => {
    let domainList = [];
    for (let i = 0; i < flArray.length; i++) {
        let domain = flArray[i].match(domainSearch);
        if (domain) {
            domainList.push(domain[1]);
        }
    }
    return new Set(domainList);
};

const GetDomainCounter = (domainSet) => {
    dict = {};
    for (let item of domainSet) {
        dict[item] = 0;
    }
    return dict;
}

// loop back through and count up different domains
const UpdateDomainCounter = (dict, domainSet) => {
    for (let i = 0; i < flArray.length; i++) {
        for (let item of domainSet) {
            // console.log('.*@' + item + '$')
            if (flArray[i].match('.*@' + item + '$')) {
                dict[item]++;
            }
        }
    }
    return dict;
}

let domainSet = getDomainSet();
console.log(flArray)
let domainCounter = GetDomainCounter(domainSet);
let result = UpdateDomainCounter(domainCounter, domainSet);

console.log(pickHighest(result, 16));
