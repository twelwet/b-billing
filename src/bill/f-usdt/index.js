'use strict';

const {getBilling} = require(`./utils`);
const {reducer, sumAssetsDataByPeriods} = require(`../bill-utils`);
const {futuresTrades} = require(`../../data-entry-point`);

const getSumByField = (data, field) => data.length > 0 ? data.map((pair) => pair[`${field}`]).reduce(reducer) : 0;

const getFuturesData = (categoryName) => {
  const pairs = getBilling(futuresTrades, categoryName);

  const generalInfo = {
    name: `${categoryName}-USDT`,
    periodNames: [...(new Set(futuresTrades.map((trade) => trade[`period`])))],
  };

  const summaryInfo = {
    invest: getSumByField(pairs, `invest`),
    profitByPeriods: sumAssetsDataByPeriods(generalInfo.periodNames, pairs, `periodProfits`),
    feeByPeriods: sumAssetsDataByPeriods(generalInfo.periodNames, pairs, `periodFees`),
    profit: getSumByField(pairs, `profit`),
    fee: getSumByField(pairs, `fee`),
  };

  return {pairs, generalInfo, summaryInfo};
};

module.exports = getFuturesData;
