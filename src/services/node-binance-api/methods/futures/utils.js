'use strict';

const {FuturesTradeParam} = require(`./constants`);

const getTimePeriods = (quantity) => {
  const interval = FuturesTradeParam.PERIOD_INTERVAL * quantity;
  const nowTimestamp = Date.now();
  const initialTimestamp = nowTimestamp - interval;
  const timePeriods = [];

  let timeLabel = nowTimestamp;
  do {
    let endTime = timeLabel - FuturesTradeParam.MILLISECOND;
    let startTime = endTime - FuturesTradeParam.PERIOD_INTERVAL;
    timePeriods.push({startTime, endTime});
    timeLabel = startTime;
  } while (timeLabel >= initialTimestamp);

  return timePeriods;
};

module.exports = {getTimePeriods};
