'use strict';

const {reducer, getAssetInfo} = require(`../bill-utils`);

const sortBySellPeriod = (a, b) => {
  const aItem = a[`periodNames`].length > 0 ? +a[`periodNames`][0].slice(-2) : 0;
  const bItem = b[`periodNames`].length > 0 ? +b[`periodNames`][0].slice(-2) : 0;
  return aItem - bItem;
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
    const {buyTrades, sellTrades, buyAmount, sellAmount} = getAssetInfo(assetTrades);
    const {totalBuy, totalSell} = getTotals(buyTrades, sellTrades);
    const profit = getAssetProfit(totalBuy, totalSell);
    const isClosed = +((buyAmount - sellAmount).toFixed(5)) <= +(2 * (buyAmount / 1000).toFixed(5));

    const periodNames = [...(new Set(sellTrades.map((trade) => trade[`period`])))];
    const periodProfits = {};
    for (const period of periodNames) {
      const sellByPeriod = sellTrades.filter((trade) => trade[`period`] === period).map((trade) => trade[`total`]).reduce(reducer);
      periodProfits[`${period}`] = profit * sellByPeriod / totalSell;
    }

    result.push({asset, buyAmount, sellAmount, totalBuy, totalSell, isClosed, profit, periodProfits, periodNames});
  }
  return result.sort(sortBySellPeriod);
};

module.exports = {getBilling};
