'use strict';

const {trades} = require(`../../service`);
const getSpotTradeAdapter = require(`../../adapters/spot-trade-adapter`);
const {PAIRS} = require(`./constants`);

const getSpotSymbolTrades = (symbol) => trades(symbol)
  .then((tradesList) => tradesList.map((trade) => getSpotTradeAdapter(symbol, trade)));

const getSpotTrades = async () => {
  const result = [];
  for (const symbol of PAIRS) {
    const symbolTrades = await getSpotSymbolTrades(symbol);
    if (symbolTrades.length > 0) {
      for (const trade of symbolTrades) {
        result.push(trade);
      }
    }
  }

  return result.sort((a, b) => a[`timestamp`] - b[`timestamp`]);
};

module.exports = getSpotTrades;
