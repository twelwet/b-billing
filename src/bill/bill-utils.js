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

const getSummaryPeriodProfits = (periodNames, allTradesInCategory) => {
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
  const buyTotal = buyTrades.length > 0 ? buyTrades.map((item) => item[`total`]).reduce(reducer) : 0;
  const sellTotal = sellTrades.length > 0 ? sellTrades.map((item) => item[`total`]).reduce(reducer) : 0;
  return {buyTrades, sellTrades, buyAmount, sellAmount, buyTotal, sellTotal};
};

const getSumByField = (trades, fieldName) => trades.length > 0
  ? trades.map((asset) => asset[`${fieldName}`]).reduce(reducer)
  : 0;

const getIsClosed = (coinsBuy, coinsSell) => +((coinsBuy - coinsSell).toFixed(5)) <= +(2 * (coinsBuy / 1000).toFixed(5));

const sortBySellPeriod = (a, b) => {
  const aItem = a[`periodNames`].length > 0 ? +a[`periodNames`][0].slice(-2) : 0;
  const bItem = b[`periodNames`].length > 0 ? +b[`periodNames`][0].slice(-2) : 0;
  return aItem - bItem;
};

const getPeriodProfits = (symbolTradesInCategory, periodNames) => {
  const periodProfits = {};
  for (const period of periodNames) {
    periodProfits[`${period}`] = symbolTradesInCategory
      .filter((trade) => trade[`period`] === period)
      .map((trade) => trade[`realizedPnl`]).reduce(reducer);
  }
  return periodProfits;
};

const getAssetProps = (symbolTradesInCategory) => {
  const {buyAmount, sellAmount} = getAssetInfo(symbolTradesInCategory);
  const periodNames = [...(new Set(symbolTradesInCategory.map((trade) => trade[`period`])))];
  const periodProfits = getPeriodProfits(symbolTradesInCategory, periodNames);

  return {
    buyAmount,
    sellAmount,
    profit: getSumByField(symbolTradesInCategory, `realizedPnl`),
    fee: getSumByField(symbolTradesInCategory, `fee`),
    invest: getSumByField(symbolTradesInCategory, `invest`),
    isClosed: getIsClosed(buyAmount, sellAmount),
    periodNames,
    periodProfits,
  };
};

module.exports = {reducer, getCountable, getSummaryPeriodProfits, getAssetInfo, getSumByField, getIsClosed, sortBySellPeriod, getAssetProps};
