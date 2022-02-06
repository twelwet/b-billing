'use strict';

const {MILLISECOND, PERIOD_INTERVAL} = require(`./constants`);

const getTimePeriods = (quantity) => {
  const interval = PERIOD_INTERVAL * quantity;
  const nowTimestamp = Date.now();
  const initialTimestamp = nowTimestamp - interval;
  const timePeriods = [];

  let timeLabel = nowTimestamp;
  do {
    let endTime = timeLabel - MILLISECOND;
    let startTime = endTime - PERIOD_INTERVAL;
    timePeriods.push({startTime, endTime});
    timeLabel = startTime;
  } while (timeLabel >= initialTimestamp);

  return timePeriods;
};

const getPeriodSymbolTrades = (api, adapter, symbol, params) => api(symbol, params)
  .then((trades) => trades.length > 0
    ? trades
      .sort((a, b) => b.time - a.time)
      .map((trade) => adapter(trade))
    : []);

const getSymbolTrades = async (api, adapter, symbol, {quantity, limit}) => {
  const periods = getTimePeriods(quantity);
  let result = [];
  for (const period of periods) {
    period.limit = limit;
    const symbolTrades = await getPeriodSymbolTrades(api, adapter, symbol, period);
    result = result.concat(symbolTrades);
  }
  return result;
};

module.exports = {getTimePeriods, getSymbolTrades};
