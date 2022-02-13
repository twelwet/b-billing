'use strict';

const {getBilling} = require(`./utils`);
const {futuresCoinTrades} = require(`../../data-entry-point`);

const getFuturesCoinData = (categoryName, coin) => {
  const pair = getBilling(futuresCoinTrades, categoryName, coin);

  const generalInfo = {
    name: `${categoryName}-${coin}`,
    periodNames: [...(new Set(futuresCoinTrades.map((trade) => trade[`period`])))],
  };

  const summaryInfo = {
    invest: pair[`invest`],
    profitByPeriods: pair[`periodProfits`],
    feeByPeriods: pair[`periodFees`],
    profit: pair[`profit`],
    fee: pair[`fee`],
  };

  console.log(summaryInfo);
  return {pair, generalInfo, summaryInfo};
};

module.exports = getFuturesCoinData;
