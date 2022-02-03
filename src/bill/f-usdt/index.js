'use strict';

const futuresTradesRow = require(`../../../data/json/futures-trades-actual.json`);
const {getCountable, getBilling} = require(`./utils`);
const {reducer, getPeriodProfits} = require(`../spot/utils`);

const futuresTrades = getCountable(futuresTradesRow);

const getSumByField = (data, field) => data.length > 0 ? data.map((pair) => pair[`${field}`]).reduce(reducer) : 0;

const getFuturesData = (categoryName) => {
  const pairs = getBilling(futuresTrades, categoryName);

  const generalInfo = {
    name: categoryName,
    periodNames: [...(new Set(futuresTrades.map((trade) => trade[`period`])))],
  };

  const summaryInfo = {
    invest: getSumByField(pairs, `invest`),
    profitByPeriods: getPeriodProfits(generalInfo.periodNames, pairs),
    profit: getSumByField(pairs, `profit`),
    fee: getSumByField(pairs, `fee`),
  };

  return {pairs, generalInfo, summaryInfo};
};

module.exports = getFuturesData;
