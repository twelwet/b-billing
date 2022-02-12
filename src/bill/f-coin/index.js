'use strict';

const {getBilling} = require(`./utils`);
const {futuresCoinTrades} = require(`../../data-entry-point`);

const getFuturesCoinData = (categoryName, coin) => {
  const pair = getBilling(futuresCoinTrades, categoryName, coin);

  const generalInfo = {
    name: `${categoryName}-${coin}`,
    periodNames: [...(new Set(futuresCoinTrades.map((trade) => trade[`period`])))],
  };

  return {pair, generalInfo};
};

module.exports = getFuturesCoinData;
