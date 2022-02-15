'use strict';

const {reducer, getAssetInfo, sortBySellPeriod, getIsClosed} = require(`../bill-utils`);

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
  const assets = [...new Set(trades.map((item) => item[`symbol`]))];
  const result = [];

  for (const asset of assets) {
    const assetTrades = trades.filter((item) => item[`symbol`] === asset);
    const {buyTrades, sellTrades, buyAmount, sellAmount} = getAssetInfo(assetTrades);
    const {totalBuy, totalSell} = getTotals(buyTrades, sellTrades);
    const profit = getAssetProfit(totalBuy, totalSell);
    const isClosed = getIsClosed(buyAmount, sellAmount);

    const periodNames = [...(new Set(sellTrades.map((trade) => trade[`period`])))];
    const periodProfits = {};
    for (const period of periodNames) {
      const sellByPeriod = sellTrades.filter((trade) => trade[`period`] === period).map((trade) => trade[`total`]).reduce(reducer);
      // TODO perhaps the calculation algorithm should be revised
      periodProfits[`${period}`] = profit * sellByPeriod / totalSell;
    }

    result.push({asset, buyAmount, sellAmount, totalBuy, totalSell, isClosed, profit, periodProfits, periodNames});
  }
  return result.sort(sortBySellPeriod);
};

module.exports = {getBilling};
