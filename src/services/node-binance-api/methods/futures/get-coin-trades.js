'use strict';

const {deliveryUserTrades} = require(`../../service`);
const getFuturesCoinTradeAdapter = require(`../../adapters/futures-trade-coin-m-adapter`);
const {FUTURES_PAIRS_COIN_M} = require(`../constants`);
const {getSymbolTrades} = require(`./utils`);
const {FuturesCoinTradeParam} = require(`./constants`);

const api = deliveryUserTrades;
const adapter = getFuturesCoinTradeAdapter;
const period = {
  quantity: FuturesCoinTradeParam.PERIODS,
  limit: FuturesCoinTradeParam.PERIOD_LIMIT,
};

const getFuturesCoinTrades = async () => {
  let result = [];
  const symbols = FUTURES_PAIRS_COIN_M;
  for (const symbol of symbols) {
    const symbolTrades = await getSymbolTrades(api, adapter, symbol, period);
    result = result.concat(symbolTrades);
  }
  return result.sort((a, b) => a[`timestamp`] - b[`timestamp`]);
};

module.exports = getFuturesCoinTrades;
