'use strict';

const spotTradesRow = require(`../../data/json/spot-trades-actual.json`);
const {reducer, getCountable, getBilling, getPeriodProfits} = require(`./utils`);
const {TradeType} = require(`./constants`);

const spotTrades = getCountable(spotTradesRow);

const getSpotData = (category, baseCoin) => {
  const closedSignalPairs = getBilling(spotTrades, category, TradeType.CLOSED, baseCoin);
  const openedSignalPairs = getBilling(spotTrades, category, TradeType.OPENED, baseCoin);
  const signalPairs = closedSignalPairs.concat(openedSignalPairs);

  const periodNames = [...(new Set(spotTrades.map((trade) => trade[`period`])))];
  const profit = signalPairs.length > 0 ? signalPairs.map((pair) => pair[`profit`]).reduce(reducer) : 0;

  return {
    periodNames,
    pairs: signalPairs,
    profit,
    profitByPeriods: getPeriodProfits(periodNames, signalPairs),
    name: `${category}-${baseCoin}`
  };
};

module.exports = getSpotData;
