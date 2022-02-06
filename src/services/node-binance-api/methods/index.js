'use strict';

const getPrices = require(`./spot/get-prices`);
const getSpotTrades = require(`./spot/get-trades`);
const getFuturesTrades = require(`./futures/get-trades`);

module.exports = {
  getPrices,
  getSpotTrades,
  getFuturesTrades,
};
