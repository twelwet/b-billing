'use strict';

const {readLineInterface} = require(`../utils`);
const {spotTrades} = require(`../../../data-entry-point`);
const {SYMBOL, CATEGORY} = require(`./constants`);
const {getSymbolBilling} = require(`./utils`);

const startScript = () => {
  readLineInterface.question(`SYMBOL [${SYMBOL}]: `, (symbol) => {
    symbol = symbol || SYMBOL;

    readLineInterface.question(`CATEGORY [${CATEGORY}]: `, (category = CATEGORY) => {
      category = category || CATEGORY;

      console.table(getSymbolBilling(spotTrades, symbol, category));
      process.exit();
    });
  });
};

startScript();
