'use strict';

const {spotTrades} = require(`../../data-entry-point`);
const {getAssetInfo} = require(`../bill-utils`);
const {getOrders} = require(`../../scripts/utils`);

const getAssetData = (symbol, category) => {
  const trades = spotTrades.filter((trade) => trade[`symbol`] === symbol).filter((trade) => trade[`category`] === category);
  const closedTrades = trades.filter((trade) => trade[`tradeType`] === `closed`);
  const openedTrades = trades.filter((trade) => trade[`tradeType`] === `opened`);

  const closedOrders = getOrders(closedTrades);
  const openedOrders = getOrders(openedTrades);

  const generalInfo = {
    name: `${category}/${symbol}`,
  };

  return {
    generalInfo,
    orders: [
      {tradeType: `closed`, items: closedOrders, summaryInfo: getAssetInfo(closedTrades)},
      {tradeType: `opened`, items: openedOrders, summaryInfo: getAssetInfo(openedTrades)},
    ],
  };
};

module.exports = {getAssetData};
