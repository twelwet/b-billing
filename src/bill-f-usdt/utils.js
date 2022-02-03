'use strict';

const {reducer, getAssetInfo} = require(`../bill-spot/utils`);

const getCountable = (data) => {
  for (const item of data) {
    item[`price`] = +item[`price`];
    item[`amount`] = +item[`amount`];
    item[`total`] = +item[`total`];
    item[`realizedPnl`] = +item[`realizedPnl`];
    item[`fee`] = +item[`fee`];
    item[`leverage`] = +item[`leverage`];
    item[`invest`] = +item[`invest`];
  }
  return data;
};

const getSumByField = (trades, fieldName) => trades.length > 0 ? trades.map((asset) => asset[`${fieldName}`]).reduce(reducer) : 0;

const getIsClosed = (coinsBuy, coinsSell) => +((coinsBuy - coinsSell).toFixed(5)) <= +(2 * (coinsBuy / 1000).toFixed(5));

const getBilling = (allTrades, categoryName) => {
  const trades = allTrades.filter((trade) => trade[`category`] === categoryName);
  const assets = [...new Set(trades.map((item) => item[`symbol`]))];
  const result = [];

  for (const asset of assets) {
    const assetTrades = trades.filter((item) => item[`symbol`] === asset);
    const {buyCoins, sellCoins} = getAssetInfo(assetTrades);
    const profit = getSumByField(assetTrades, `realizedPnl`);
    const fee = getSumByField(assetTrades, `fee`);
    const invest = getSumByField(assetTrades, `invest`);
    const isClosed = getIsClosed(buyCoins, sellCoins);

    const periodNames = [...(new Set(assetTrades.map((trade) => trade[`period`])))];
    const periodProfits = {};
    for (const period of periodNames) {
      periodProfits[`${period}`] = assetTrades.filter((trade) => trade[`period`] === period).map((trade) => trade[`realizedPnl`]).reduce(reducer);
    }

    result.push({asset, invest, buyCoins, sellCoins, isClosed, periodNames, periodProfits, profit, fee});
  }

  return result;
};

module.exports = {getCountable, getBilling};
