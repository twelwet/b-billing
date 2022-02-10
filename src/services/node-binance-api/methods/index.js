'use strict';

const getPrices = require(`./spot/get-prices`);
const getSpotTrades = require(`./spot/get-trades`);
const getFuturesTrades = require(`./futures/get-trades`);
const getFuturesCoinTrades = require(`./futures/get-coin-trades`);
const getWithdrawHistory = require(`./cash-flow/get-withdraw-history`);
const getDepositHistory = require(`./cash-flow/get-deposit-history`);
const divideSymbolsToGroups = require(`./spot/divide-symbols-to-groups`);

module.exports = {
  getPrices,
  getSpotTrades,
  getFuturesTrades,
  getFuturesCoinTrades,
  getWithdrawHistory,
  getDepositHistory,
  divideSymbolsToGroups,
};
