'use strict';

const readline = require(`readline`);
const {getPrices} = require(`../../services/node-binance-api/methods`);

const readLineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const findSymbol = async (symbol, defaultSymbol) => {
  const allSymbolsPrices = await getPrices();
  const symbols = Object.keys(allSymbolsPrices);
  const result = symbols.find((item) => item.includes(symbol.toUpperCase()));
  if (result) {
    console.log(`${result} symbol is found.`);
    return result;
  } else {
    console.log(`${defaultSymbol} symbol is used.`);
    return defaultSymbol;
  }
};

module.exports = {readLineInterface, findSymbol};
