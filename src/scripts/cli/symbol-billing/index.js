'use strict';

const {readLineInterface, findSymbol} = require(`../utils`);
const {spotTrades} = require(`../../../data-entry-point`);
const {SYMBOL, CATEGORY} = require(`./constants`);
const {getSymbolBilling} = require(`./utils`);

const startScript = () => {
  readLineInterface.question(`SYMBOL [${SYMBOL}]: `, async (symbol) => {
    symbol = await findSymbol(symbol, SYMBOL);

    readLineInterface.question(`CATEGORY [${CATEGORY}]: `, (category) => {
      category = category || CATEGORY;

      const {buy, sell} = getSymbolBilling(spotTrades, symbol, category);
      console.table(buy);
      console.table(sell);

      process.exit();
    });
  });
};

startScript();
