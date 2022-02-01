'use strict';

const spotTradesRow = require(`../../data/json/spot-trades-actual.json`);
const {reducer, getCountable} = require(`./utils`);
const {SPOT_SIGNAL_CATEGORY, Type} = require(`./constants`);

const spotTrades = getCountable(spotTradesRow);

const signalTrades = spotTrades.filter((trade) => trade[`category`] === SPOT_SIGNAL_CATEGORY);
const signalAssets = [...new Set(signalTrades.map((item) => item[`market`]))];

const spotBilling = [];
for (const asset of signalAssets) {
  const assetTrades = signalTrades.filter((item) => item[`market`] === asset);

  const buyTrades = assetTrades.filter((item) => item[`type`] === Type.BUY);
  const sellTrades = assetTrades.filter((item) => item[`type`] === Type.SELL);

  const buy = buyTrades.length > 0 ? buyTrades.map((item) => item[`amount`]).reduce(reducer) : 0;
  const sell = sellTrades.length > 0 ? sellTrades.map((item) => item[`amount`]).reduce(reducer) : 0;

  const totalBuy = buyTrades.length > 0 ? buyTrades.map((item) => item[`total`]).reduce(reducer) : 0;
  const totalSell = sellTrades.length > 0 ? sellTrades.map((item) => item[`total`]).reduce(reducer) : 0;

  const isClosed = +((buy - sell).toFixed(5)) <= +(2 * (buy / 1000).toFixed(5));

  const profit = totalSell === 0 ? 0 : totalSell - totalBuy;

  spotBilling.push({asset, buy, sell, isClosed, profit});
}

module.exports = {spotBilling};
