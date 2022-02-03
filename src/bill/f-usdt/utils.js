'use strict';

const {reducer, getAssetInfo, getSumByField, getIsClosed, sortBySellPeriod} = require(`../bill-utils`);

const getBilling = (allTrades, categoryName) => {
  const trades = allTrades.filter((trade) => trade[`category`] === categoryName);
  const assets = [...new Set(trades.map((item) => item[`symbol`]))];
  const result = [];

  for (const asset of assets) {
    const assetTrades = trades.filter((item) => item[`symbol`] === asset);
    const {buyAmount, sellAmount} = getAssetInfo(assetTrades);
    const profit = getSumByField(assetTrades, `realizedPnl`);
    const fee = getSumByField(assetTrades, `fee`);
    const invest = getSumByField(assetTrades, `invest`);
    const isClosed = getIsClosed(buyAmount, sellAmount);

    const periodNames = [...(new Set(assetTrades.map((trade) => trade[`period`])))];
    const periodProfits = {};
    for (const period of periodNames) {
      periodProfits[`${period}`] = assetTrades.filter((trade) => trade[`period`] === period).map((trade) => trade[`realizedPnl`]).reduce(reducer);
    }

    result.push({asset, invest, buyAmount, sellAmount, isClosed, periodNames, periodProfits, profit, fee});
  }

  return result.sort(sortBySellPeriod);
};

module.exports = {getBilling};
