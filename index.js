const fs = require('fs');
const Calculator = require('./models/calculator');

const main = async (path) => {
    const calculator = new Calculator();
    const value = fs.readFileSync(path, {encoding: 'utf-8'});
    const response = await calculator.evaluate(value);
    console.log(response);
};

main(__dirname + '/expresionNumerica.txt');