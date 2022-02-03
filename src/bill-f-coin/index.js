'use strict';

const futuresCoinTradesRow = require(`../../data/json/futures-trades-coin-m-actual.json`);
const {getCountable} = require(`../bill-f-usdt/utils`);
const {getBilling} = require(`./utils`);

const futuresCoinTrades = getCountable(futuresCoinTradesRow);

const getFuturesCoinData = (categoryName, coin) => {
  const pair = getBilling(futuresCoinTrades, categoryName, coin);

  const generalInfo = {
    name: categoryName,
  };

  return {pair, generalInfo};
};

module.exports = getFuturesCoinData;
