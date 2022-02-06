'use strict';

const {futuresUserTrades} = require(`../../service`);
const getFuturesTradeAdapter = require(`../../adapters/futures-trade-adapter`);
const {FUTURES_PAIRS} = require(`../constants`);
const {getTimePeriods} = require(`./utils`);
const {FuturesTradeParam} = require(`./constants`);

const getPeriodSymbolTrades = (symbol, params) => futuresUserTrades(symbol, params)
  .then((trades) => trades.length > 0
    ? trades
        .sort((a, b) => b.time - a.time)
        .map((trade) => getFuturesTradeAdapter(trade))
    : []);

const getSymbolTrades = async (symbol) => {
  const periods = getTimePeriods(FuturesTradeParam.PERIODS);
  let result = [];
  for (const period of periods) {
    period.limit = FuturesTradeParam.PERIOD_LIMIT;
    const symbolTrades = await getPeriodSymbolTrades(symbol, period);
    result = result.concat(symbolTrades);
  }
  return result;
};

const getFuturesTrades = async () => {
  let result = [];
  const symbols = FUTURES_PAIRS;
  for (const symbol of symbols) {
    const symbolTrades = await getSymbolTrades(symbol);
    result = result.concat(symbolTrades);
  }
  return result.sort((a, b) => a[`timestamp`] - b[`timestamp`]);
};

module.exports = getFuturesTrades;
