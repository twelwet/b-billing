'use strict';

const spotTradesRow = require(`../../data/json/spot-trades-actual.json`);
const {reducer, getCountable, getBilling, getPeriodProfits} = require(`./utils`);
const {TradeType} = require(`./constants`);

const spotTrades = getCountable(spotTradesRow);

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
    profitByPeriods: getPeriodProfits(generalInfo.periodNames, pairs),
  };

  return {
    pairs,
    summaryInfo,
    generalInfo,
  };
};

module.exports = getSpotData;
