'use strict';

const {deliveryUserTrades} = require(`../../service`);
const getFuturesCoinTradeAdapter = require(`../../adapters/futures-trade-coin-m-adapter`);
const {FUTURES_PAIRS_COIN_M} = require(`../constants`);
const {getTimePeriods, getPeriodSymbolTrades} = require(`./utils`);
const {FuturesCoinTradeParam} = require(`./constants`);

const getSymbolTrades = async (symbol) => {
  const periods = getTimePeriods(FuturesCoinTradeParam.PERIODS);
  let result = [];
  for (const period of periods) {
    period.limit = FuturesCoinTradeParam.PERIOD_LIMIT;
    const symbolTrades = await getPeriodSymbolTrades(deliveryUserTrades, getFuturesCoinTradeAdapter, symbol, period);
    result = result.concat(symbolTrades);
  }
  return result;
};

const getFuturesCoinTrades = async () => {
  let result = [];
  const symbols = FUTURES_PAIRS_COIN_M;
  for (const symbol of symbols) {
    const symbolTrades = await getSymbolTrades(symbol);
    result = result.concat(symbolTrades);
  }
  return result.sort((a, b) => a[`timestamp`] - b[`timestamp`]);
};

module.exports = getFuturesCoinTrades;
