const fs = require('fs');
const readline = require("readline-sync");

// Read file and make array of words.
const fl = fs.readFileSync('test.txt', 'utf8');
const flArray = fl.split(/[\r\n]+|\s/)

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

// Function for returning attributes with more than n instances.
const returnIfHigherThanN = (obj, num = 1,) => {
    const requiredObj = {};
    Object.keys(obj).forEach((key) => {
        if (obj[key] > num) {
            requiredObj[key] = obj[key];
        }
    });
    return requiredObj;
};

const getDomainSet = () => {
    let domainSearch = new RegExp('.@(.*\..*)')
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
            if (flArray[i].match('.*@' + item + '$')) {
                dict[item]++;
            }
        }
    }
    return dict;
}

// loop back through and count up different domains
const UpdateGroupedDomainCounter = (dict, domainSet) => {
    let groupedDomainSearch = new RegExp('[^\.]*')
    for (let i = 0; i < flArray.length; i++) {
        for (let item of domainSet) {
            if (flArray[i].match('.*@' + item + '$')) {
                let groupedKey = item.match(groupedDomainSearch);
                dict[groupedKey]++;
            }
        }
    }
    return dict;
}

const getGroupedDomainSet = (domainSet) => {
    let groupedDomainSearch = new RegExp('[^\.]*')
    let groupedDomainList = [];
    for (let item of domainSet) {
        let groupedDomain = item.match(groupedDomainSearch);
        groupedDomainList.push(groupedDomain)
    }
    return new Set(groupedDomainList);
}

let domainSet = getDomainSet();
let domainCounter = GetDomainCounter(domainSet);
let result = UpdateDomainCounter(domainCounter, domainSet);

let groupedDomainSet = getGroupedDomainSet(domainSet);
let groupDomainCounter = GetDomainCounter(groupedDomainSet);
let groupedResult = UpdateGroupedDomainCounter(groupDomainCounter, domainSet)



console.log('Please select the mode you want: \n1) Top 10 results \n2) More than n occurrences \n3) Grouped by domain');
const mode = Number(readline.prompt());

if (mode === 1) {
    console.log(pickHighest(result,10));
} else if (mode === 2) {
    console.log('Please enter a number:')
    const hits = Number(readline.prompt());
    console.log(returnIfHigherThanN(result, hits));
} else if (mode === 3) {
    console.log(groupedResult);
}








