'use strict';

const {getAssetInfo, getIsClosed} = require(`../bill/bill-utils`);

const sortByIsClosed = (a, b) => a[`isClosed`] - b[`isClosed`];

const getBalances = (trades, category) => {
  const categoryTrades = trades.filter((trade) => trade[`category`] === category);

  const symbols = [...new Set(categoryTrades.map((trade) => trade[`symbol`]))].sort();

  const balances = [];
  for (const symbol of symbols) {
    const symbolTrades = categoryTrades.filter((trade) => trade[`symbol`] === symbol);
    const {buyAmount, sellAmount, buyTotal, sellTotal} = getAssetInfo(symbolTrades);
    const isClosed = getIsClosed(buyAmount, sellAmount);
    balances.push({asset: symbol, isClosed, buyAmount, sellAmount, buyTotal, sellTotal});
  }

  return balances.sort(sortByIsClosed);
};

module.exports = {getBalances};
