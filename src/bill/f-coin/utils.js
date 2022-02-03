'use strict';

const {reducer, getAssetInfo} = require(`../spot/utils`);

const getSumByField = (trades, fieldName) => trades.length > 0 ? trades.map((asset) => asset[`${fieldName}`]).reduce(reducer) : 0;

const getIsClosed = (coinsBuy, coinsSell) => +((coinsBuy - coinsSell).toFixed(5)) <= +(2 * (coinsBuy / 1000).toFixed(5));

const getBilling = (allTrades, categoryName, coin) => {
  const trades = allTrades
    .filter((trade) => trade[`category`] === categoryName)
    .filter((trade) => trade[`symbol`] === coin);

  const {buyAmount, sellAmount} = getAssetInfo(trades);
  const profit = getSumByField(trades, `realizedPnl`);
  const fee = getSumByField(trades, `fee`);
  const invest = getSumByField(trades, `invest`);
  const isClosed = getIsClosed(buyAmount, sellAmount);

  const periodNames = [...(new Set(trades.map((trade) => trade[`period`])))];
  const periodProfits = {};
  for (const period of periodNames) {
    periodProfits[`${period}`] = trades.filter((trade) => trade[`period`] === period).map((trade) => trade[`realizedPnl`]).reduce(reducer);
  }

  return {asset: coin, invest, buyAmount, sellAmount, isClosed, periodNames, periodProfits, profit, fee};
};

module.exports = {getBilling};
