'use strict';

const MILLISECOND = 1; // one millisecond
const PERIOD_INTERVAL = 86400 * 1000 * 7; // 1 week in ms
const PERIODS = 2; // quantity of periods
const PERIOD_LIMIT = 1000; // max quantity of symbol trades in one period
const PERIOD_LIMIT_COIN = 100; // max quantity of coin-m symbol trades in one period

const FuturesTradeParam = {
  MILLISECOND,
  PERIOD_INTERVAL,
  PERIODS,
  PERIOD_LIMIT
};

const FuturesCoinTradeParam = {
  MILLISECOND,
  PERIOD_INTERVAL,
  PERIODS,
  PERIOD_LIMIT: PERIOD_LIMIT_COIN
};

module.exports = {FuturesTradeParam, FuturesCoinTradeParam};
