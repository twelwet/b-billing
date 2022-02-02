'use strict';

const {Type} = require(`./constants`);

const reducer = (previousValue, currentValue) => previousValue + currentValue;

const getCountable = (data) => {
  for (const item of data) {
    item[`price`] = +item[`price`];
    item[`amount`] = +item[`amount`];
    item[`total`] = +item[`total`];
    item[`fee`] = +item[`fee`];
  }
  return data;
};

const sortBySellPeriod = (a, b) => {
  const aItem = a[`periodNames`].length > 0 ? +a[`periodNames`][0].slice(-2) : 0;
  const bItem = b[`periodNames`].length > 0 ? +b[`periodNames`][0].slice(-2) : 0;
  return aItem - bItem;
};

const getAssetInfo = (trades) => {
  const buyTrades = trades.filter((item) => item[`type`] === Type.BUY);
  const sellTrades = trades.filter((item) => item[`type`] === Type.SELL);
  const buyCoins = buyTrades.length > 0 ? buyTrades.map((item) => item[`amount`]).reduce(reducer) : 0;
  const sellCoins = sellTrades.length > 0 ? sellTrades.map((item) => item[`amount`]).reduce(reducer) : 0;
  return {buyTrades, sellTrades, buyCoins, sellCoins};
};

const getTotals = (buyTradesList, sellTradesList) => {
  return {
    totalSell: sellTradesList.length > 0 ? sellTradesList.map((item) => item[`total`]).reduce(reducer) : 0,
    totalBuy: buyTradesList.length > 0 ? buyTradesList.map((item) => item[`total`]).reduce(reducer) : 0,
  };
};

const getAssetProfit = (totalBuy, totalSell) => {
  return totalSell === 0 ? 0 : totalSell - totalBuy;
};

const getBilling = (allTrades, categoryName, tradeType, baseCoin) => {
  const allTradesInCategory = allTrades
    .filter((trade) => trade[`category`] === categoryName)
    .filter((trade) => trade[`baseCoin`] === baseCoin);
  const trades = allTradesInCategory.filter((trade) => trade[`tradeType`] === tradeType);
  const assets = [...new Set(trades.map((item) => item[`market`]))];
  const result = [];

  for (const asset of assets) {
    const assetTrades = trades.filter((item) => item[`market`] === asset);
    const {buyTrades, sellTrades, buyCoins, sellCoins} = getAssetInfo(assetTrades);
    const {totalBuy, totalSell} = getTotals(buyTrades, sellTrades);
    const profit = getAssetProfit(totalBuy, totalSell);
    const isClosed = +((buyCoins - sellCoins).toFixed(5)) <= +(2 * (buyCoins / 1000).toFixed(5));

    const periodNames = [...(new Set(sellTrades.map((trade) => trade[`period`])))];
    const periodProfits = {};
    for (const period of periodNames) {
      const sellByPeriod = sellTrades.filter((trade) => trade[`period`] === period).map((trade) => trade[`total`]).reduce(reducer);
      periodProfits[`${period}`] = profit * sellByPeriod / totalSell;
    }

    result.push({asset, buyCoins, sellCoins, totalBuy, totalSell, isClosed, profit, periodProfits, periodNames});
  }
  return result.sort(sortBySellPeriod);
};

const getPeriodProfits = (periodNames, allTradesInCategory) => {
  const periodProfits = [];
  for (const period of periodNames) {
    const periodProfit = allTradesInCategory
      .filter((pair) => pair[`periodNames`].find((periodName) => periodName === period))
      .map((pair) => pair[`periodProfits`][`${period}`]);
    periodProfits.push(periodProfit.length > 0 ? periodProfit.reduce(reducer) : 0);
  }
  return periodProfits;
};

module.exports = {reducer, getAssetInfo, getCountable, getBilling, getPeriodProfits};
