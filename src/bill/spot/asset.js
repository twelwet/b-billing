'use strict';

const {spotTrades} = require(`../../data-entry-point`);
const {getSymbolBilling} = require(`./utils`);
const {getOrders} = require(`../../scripts/utils`);

const getAssetData = (symbol, category) => {
  const periodNames = [...(new Set(spotTrades.map((trade) => trade[`period`])))];
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
      {tradeType: `closed`, items: closedOrders, summaryInfo: getSymbolBilling(closedTrades, symbol, periodNames)},
      {tradeType: `opened`, items: openedOrders, summaryInfo: getSymbolBilling(openedTrades, symbol, periodNames)},
    ],
  };
};

module.exports = {getAssetData};
