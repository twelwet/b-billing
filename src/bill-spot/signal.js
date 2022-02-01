'use strict';

const spotTradesRow = require(`../../data/json/spot-trades-actual.json`);
const {reducer, getCountable, getBilling, getPeriodProfits} = require(`./utils`);
const {SPOT_SIGNAL_CATEGORY, TradeType, BaseCoin} = require(`./constants`);

const spotTrades = getCountable(spotTradesRow);

const closedSignalPairs = getBilling(spotTrades, SPOT_SIGNAL_CATEGORY, TradeType.CLOSED, BaseCoin.BTC);
const openedSignalPairs = getBilling(spotTrades, SPOT_SIGNAL_CATEGORY, TradeType.OPENED, BaseCoin.BTC);
const signalPairs = closedSignalPairs.concat(openedSignalPairs);

const periodNames = [...(new Set(spotTrades.map((trade) => trade[`period`])))];

const spotSignalBilling = {
  periodNames,
  pairs: signalPairs,
  profit: signalPairs.map((pair) => pair[`profit`]).reduce(reducer),
  periodProfits: getPeriodProfits(periodNames, signalPairs),
};

module.exports = {spotSignalBilling};
