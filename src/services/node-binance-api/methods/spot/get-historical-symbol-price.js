'use strict';

const {candlesticks} = require(`../../service`);

const getHistoricalSymbolPrice = (symbol, startTime, interval = `1m`, limit = 1) => candlesticks(symbol, interval, false, {startTime, limit})
  .then((data) => {
    const [, , , , closePrice] = data[data.length - 1];
    return closePrice;
  });

module.exports = getHistoricalSymbolPrice;
