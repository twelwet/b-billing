'use strict';

const futuresCoinTradesRow = require(`../../../data/json/futures-trades-coin-m-actual.json`);
const {getCountable} = require(`../bill-utils`);
const {getBilling} = require(`./utils`);

const futuresCoinTrades = getCountable(futuresCoinTradesRow, [`price`, `amount`, `total`, `realizedPnl`, `fee`, `leverage`, `invest`]);

const getFuturesCoinData = (categoryName, coin) => {
  const pair = getBilling(futuresCoinTrades, categoryName, coin);

  const generalInfo = {
    name: categoryName,
    periodNames: [...(new Set(futuresCoinTrades.map((trade) => trade[`period`])))],
  };

  return {pair, generalInfo};
};

module.exports = getFuturesCoinData;