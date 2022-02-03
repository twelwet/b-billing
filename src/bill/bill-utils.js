'use strict';

const {Type} = require(`./constants`);
const reducer = (previousValue, currentValue) => previousValue + currentValue;

const getCountable = (data, fields) => {
  for (const item of data) {
    for (const field of fields) {
      item[`${field}`] = +item[`${field}`];
    }
  }
  return data;
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

const getAssetInfo = (trades) => {
  const buyTrades = trades.filter((item) => item[`type`] === Type.BUY);
  const sellTrades = trades.filter((item) => item[`type`] === Type.SELL);
  const buyAmount = buyTrades.length > 0 ? buyTrades.map((item) => item[`amount`]).reduce(reducer) : 0;
  const sellAmount = sellTrades.length > 0 ? sellTrades.map((item) => item[`amount`]).reduce(reducer) : 0;
  return {buyTrades, sellTrades, buyAmount, sellAmount};
};

const getSumByField = (trades, fieldName) => trades.length > 0
  ? trades.map((asset) => asset[`${fieldName}`]).reduce(reducer)
  : 0;

const getIsClosed = (coinsBuy, coinsSell) => +((coinsBuy - coinsSell).toFixed(5)) <= +(2 * (coinsBuy / 1000).toFixed(5));


module.exports = {reducer, getCountable, getPeriodProfits, getAssetInfo, getSumByField, getIsClosed};
