'use strict';

const MILLISECOND = 1; // one millisecond
const PERIOD_INTERVAL = 86400 * 1000 * 7; // 1 week in ms
const PERIODS = 2; // quantity of periods
const PERIOD_LIMIT = 1000; // symbol trades in one period

const FuturesTradeParam = {MILLISECOND, PERIOD_INTERVAL, PERIODS, PERIOD_LIMIT};

module.exports = FuturesTradeParam;
