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

const getAssetProfit = (trades) => trades.length > 0 ? trades.map((asset) => asset[`realizedPnl`]).reduce(reducer) : 0;

const getFee = (trades) => trades.length > 0 ? trades.map((asset) => asset[`fee`]).reduce(reducer) : 0;

const getIsClosed = (coinsBuy, coinsSell) => +((coinsBuy - coinsSell).toFixed(5)) <= +(2 * (coinsBuy / 1000).toFixed(5));

const getBilling = (allTrades, categoryName) => {
  const trades = allTrades.filter((trade) => trade[`category`] === categoryName);
  const assets = [...new Set(trades.map((item) => item[`symbol`]))];
  const result = [];

  for (const asset of assets) {
    const assetTrades = trades.filter((item) => item[`symbol`] === asset);
    const {buyCoins, sellCoins} = getAssetInfo(assetTrades);
    const profit = getAssetProfit(assetTrades);
    const fee = getFee(assetTrades);
    const isClosed = getIsClosed(buyCoins, sellCoins);
    result.push({asset, buyCoins, sellCoins, isClosed, profit, fee});
  }

  return result;
};

module.exports = {getCountable, getBilling};
