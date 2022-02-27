'use strict';

const MILLISECOND = 1; // one millisecond
const PERIOD_INTERVAL = 86400 * 1000 * 7; // 1 week in ms

const FuturesTradeParam = {
  PERIODS: 4, // quantity of periods
  PERIOD_LIMIT: 1000, // max quantity of symbol trades in one period
};

const FuturesCoinTradeParam = {
  PERIODS: 4, // quantity of periods
  PERIOD_LIMIT: 100, // max quantity of coin-m symbol trades in one period
};

module.exports = {FuturesTradeParam, FuturesCoinTradeParam, MILLISECOND, PERIOD_INTERVAL};
