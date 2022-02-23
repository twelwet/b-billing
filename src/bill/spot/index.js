'use strict';

const {getBilling} = require(`./utils`);
const {reducer, sumAssetsDataByPeriods} = require(`../bill-utils`);
const {TradeType} = require(`../constants`);
const {spotTrades} = require(`../../data-entry-point`);

const getSpotData = (category, baseCoin) => {
  const closedPairs = getBilling(spotTrades, category, TradeType.CLOSED, baseCoin);
  const openedPairs = getBilling(spotTrades, category, TradeType.OPENED, baseCoin);

  const pairs = closedPairs.concat(openedPairs);

  const generalInfo = {
    name: `${category}-${baseCoin}`,
    periodNames: [...(new Set(spotTrades.map((trade) => trade[`period`])))],
  };

  const summaryInfo = {
    profit: pairs.length > 0 ? pairs.map((pair) => pair[`profit`]).reduce(reducer) : 0,
    profitByPeriods: sumAssetsDataByPeriods(generalInfo.periodNames, pairs, `periodProfits`),
    buyTotal: pairs.length > 0 ? pairs.map((pair) => pair[`buyTotal`]).reduce(reducer) : 0,
    sellTotal: pairs.length > 0 ? pairs.map((pair) => pair[`sellTotal`]).reduce(reducer) : 0,
  };

  return {
    pairs,
    summaryInfo,
    generalInfo,
  };
};

module.exports = getSpotData;
