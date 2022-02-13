'use strict';

const {getBilling} = require(`./utils`);
const {sumAssetsDataByPeriods} = require(`../bill-utils`);
const {futuresCoinTrades} = require(`../../data-entry-point`);

const getFuturesCoinData = (categoryName, coin) => {
  const pair = getBilling(futuresCoinTrades, categoryName, coin);

  const generalInfo = {
    name: `${categoryName}-${coin}`,
    periodNames: [...(new Set(futuresCoinTrades.map((trade) => trade[`period`])))],
  };

  const summaryInfo = {
    invest: pair[`invest`],
    profitByPeriods: sumAssetsDataByPeriods(generalInfo.periodNames, [pair], `periodProfits`),
    feeByPeriods: sumAssetsDataByPeriods(generalInfo.periodNames, [pair], `periodFees`),
    profit: pair[`profit`],
    fee: pair[`fee`],
  };

  return {pair, generalInfo, summaryInfo};
};

module.exports = getFuturesCoinData;
