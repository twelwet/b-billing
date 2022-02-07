'use strict';

const {sortBySellPeriod, getAssetProps} = require(`../bill-utils`);

const getBilling = (allTrades, categoryName) => {
  const trades = allTrades.filter((trade) => trade[`category`] === categoryName);
  const assets = [...new Set(trades.map((item) => item[`symbol`]))];
  const result = [];

  for (const asset of assets) {
    const assetTrades = trades.filter((item) => item[`symbol`] === asset);

    const {
      buyAmount,
      sellAmount,
      profit,
      fee,
      invest,
      isClosed,
      periodNames,
      periodProfits,
    } = getAssetProps(assetTrades);

    result.push({asset, invest, buyAmount, sellAmount, isClosed, periodNames, periodProfits, profit, fee});
  }

  return result.sort(sortBySellPeriod);
};

module.exports = {getBilling};
