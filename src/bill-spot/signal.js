'use strict';

const spotTradesRow = require(`../../data/json/spot-trades-actual.json`);
const {reducer, getCountable, getBilling} = require(`./utils`);
const {SPOT_SIGNAL_CATEGORY, TradeType} = require(`./constants`);

const spotTrades = getCountable(spotTradesRow);

const closedSignalPairs = getBilling(spotTrades, SPOT_SIGNAL_CATEGORY, TradeType.CLOSED);
const openedSignalPairs = getBilling(spotTrades, SPOT_SIGNAL_CATEGORY, TradeType.OPENED);
const signalPairs = closedSignalPairs.concat(openedSignalPairs);

const spotSignalBilling = {
  profit: signalPairs.map((pair) => pair[`profit`]).reduce(reducer),
  pairs: signalPairs,
};

module.exports = {spotSignalBilling};
