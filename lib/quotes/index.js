// dependencies
const fs = require('fs');

// quotes object - Module scaffolding
const quotes = {};

quotes.allQuotes = function allQuotes() {
    const contentOfFile = fs.readFileSync(`${__dirname}/quotes.txt`, 'utf-8');

    // making an array from string
    const quotesArray = contentOfFile.split(/\r?\n/);

    // return the array
    return quotesArray;
};
module.exports = quotes;
