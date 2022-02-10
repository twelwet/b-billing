'use strict';

const getPrices = require(`./get-prices`);

const getSymbols = async () => Object.keys(await getPrices()).sort();

const divideSymbolsToGroups = async (count) => {
  const symbols = await getSymbols();
  const groupNumbers = [...Array(Math.ceil(symbols.length / count)).keys()].map((item) => item + 1);

  const groups = groupNumbers.map((number) => {
    if (number === 1) {
      return symbols.slice(0, count);
    } else {
      return symbols.slice((number - 1) * count, number * count);
    }
  });

  return groups;
};

module.exports = divideSymbolsToGroups;
