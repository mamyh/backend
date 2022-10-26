// dependencies

const mathLibrary = require('./lib/math');
const quotesLibrary = require('./lib/quotes');
// App object - Module scaffolding
const app = {};

// configuration
app.config = {
    timeBetweenQuotes: 1000,
};

// function that prints a random quote
app.printAQuote = function printAQuote() {
    // get all the quotes
    const allQuotes = quotesLibrary.allQuotes();

    // get the length of quotes
    const numberOfQuotes = allQuotes.length;

    // pick a random number between 1 and the number of quotes
    const randomNumber = mathLibrary.getRandomNumber(1, numberOfQuotes);

    // get the quote al the position in the array (minus one)
    const selectedQuote = allQuotes[randomNumber - 1];

    // print the quote
    console.log(selectedQuote);
};

// function that loops indefinitely , calling the printAQuote function as it goes

app.indefiniteLoop = function indefiniteLoop() {
    // create the interval , using the config variable defined above
    setInterval(app.printAQuote, app.config.timeBetweenQuotes);
};

// invoke the loop
app.indefiniteLoop();
