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

const sortByIsClosed = (a, b) => {
  if (a[`isClosed`] * b[`isClosed`]) {
    return 1;
  } else {
    return -1;
  }
};

const getAssetInfo = (trades) => {
  const buyTrades = trades.filter((item) => item[`type`] === Type.BUY);
  const sellTrades = trades.filter((item) => item[`type`] === Type.SELL);
  const buy = buyTrades.length > 0 ? buyTrades.map((item) => item[`amount`]).reduce(reducer) : 0;
  const sell = sellTrades.length > 0 ? sellTrades.map((item) => item[`amount`]).reduce(reducer) : 0;
  return {buyTrades, sellTrades, buy, sell};
};

const getAssetProfit = (buyTrades, sellTrades) => {
  const totalBuy = buyTrades.length > 0 ? buyTrades.map((item) => item[`total`]).reduce(reducer) : 0;
  const totalSell = sellTrades.length > 0 ? sellTrades.map((item) => item[`total`]).reduce(reducer) : 0;
  return totalSell === 0 ? 0 : totalSell - totalBuy;
};

const getBilling = (allTrades, categoryName, tradeType) => {
  const allTradesInCategory = allTrades.filter((trade) => trade[`category`] === categoryName);
  const trades = allTradesInCategory.filter((trade) => trade[`tradeType`] === tradeType);
  const assets = [...new Set(trades.map((item) => item[`market`]))];
  const result = [];

  for (const asset of assets) {
    const assetTrades = trades.filter((item) => item[`market`] === asset);
    const {buyTrades, sellTrades, buy, sell} = getAssetInfo(assetTrades);
    const profit = getAssetProfit(buyTrades, sellTrades);
    const isClosed = +((buy - sell).toFixed(5)) <= +(2 * (buy / 1000).toFixed(5));
    result.push({asset, buy, sell, isClosed, profit});
  }
  return result.sort(sortByIsClosed);
};

module.exports = {reducer, getCountable, sortByIsClosed, getBilling};
