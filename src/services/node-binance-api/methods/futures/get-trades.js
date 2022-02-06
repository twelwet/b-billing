'use strict';

const {futuresUserTrades} = require(`../../service`);
const getFuturesTradeAdapter = require(`../../adapters/futures-trade-adapter`);
const {FUTURES_PAIRS} = require(`../constants`);
const {getSymbolTrades} = require(`./utils`);
const {FuturesTradeParam} = require(`./constants`);

const api = futuresUserTrades;
const adapter = getFuturesTradeAdapter;
const period = {
  quantity: FuturesTradeParam.PERIODS,
  limit: FuturesTradeParam.PERIOD_LIMIT,
};

const getFuturesTrades = async () => {
  let result = [];
  const symbols = FUTURES_PAIRS;
  for (const symbol of symbols) {
    const symbolTrades = await getSymbolTrades(api, adapter, symbol, period);
    result = result.concat(symbolTrades);
  }
  return result.sort((a, b) => a[`timestamp`] - b[`timestamp`]);
};

module.exports = getFuturesTrades;
