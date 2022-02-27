'use strict';

const {sortBySellPeriod} = require(`../bill-utils`);
const {getTargetTrades, getSymbolBilling} = require(`./utils`);

const getBilling = (allTrades, categoryName, tradeType, baseCoin) => {
  const targetTrades = getTargetTrades(allTrades, categoryName, tradeType, baseCoin);
  const targetAssets = [...new Set(targetTrades.map((item) => item[`symbol`]))];
  const periodNames = [...(new Set(allTrades.map((trade) => trade[`period`])))];
  const result = [];
  for (const asset of targetAssets) {
    const {
      buyAmount,
      sellAmount,
      buyTotal,
      sellTotal,
      isClosed,
      profit,
      periodProfits,
      periodFee,
      fee,
    } = getSymbolBilling(targetTrades, asset, periodNames);

    result.push({
      asset,
      buyAmount,
      sellAmount,
      buyTotal,
      sellTotal,
      isClosed,
      profit,
      periodProfits,
      periodNames,
      periodFee,
      fee,
    });
  }
  return result.sort(sortBySellPeriod);
};

module.exports = getBilling;
