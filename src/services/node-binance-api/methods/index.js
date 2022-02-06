'use strict';

const getPrices = require(`./spot/get-prices`);
const getSpotTrades = require(`./spot/get-trades`);
const getFuturesTrades = require(`./futures/get-trades`);
const getFuturesCoinTrades = require(`./futures/get-coin-trades`);

module.exports = {
  getPrices,
  getSpotTrades,
  getFuturesTrades,
  getFuturesCoinTrades,
};
