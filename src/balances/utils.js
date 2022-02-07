'use strict';

const {getAssetInfo} = require(`../bill/bill-utils`);

const getBalances = (trades, category) => {
  const categoryTrades = trades.filter((trade) => trade[`category`] === category);

  const symbols = [...new Set(categoryTrades.map((trade) => trade[`symbol`]))].sort();

  const balances = [];
  for (const symbol of symbols) {
    const symbolTrades = categoryTrades.filter((trade) => trade[`symbol`] === symbol);
    const {buyAmount, sellAmount, buyTotal, sellTotal} = getAssetInfo(symbolTrades);
    balances.push({asset: symbol, buyAmount, sellAmount, buyTotal, sellTotal});
  }

  return balances;
};

module.exports = {getBalances};
