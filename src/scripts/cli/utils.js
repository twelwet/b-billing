'use strict';

const readline = require(`readline`);

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

module.exports = {readLineInterface};
