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

const sumAssetsDataByPeriods = (periodNames, allTradesInCategory, field) => {
  const summaryData = [];
  for (const period of periodNames) {
    const periodData = allTradesInCategory
      .filter((pair) => pair[`periodNames`].find((periodName) => periodName === period))
      .map((pair) => pair[field][`${period}`]);
    summaryData.push(periodData.length > 0 ? periodData.reduce(reducer) : 0);
  }
  return summaryData;
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

const sumAssetDataByPeriods = (symbolTradesInCategory, periodNames, field) => {
  const periodProfits = {};
  for (const period of periodNames) {
    periodProfits[`${period}`] = symbolTradesInCategory
      .filter((trade) => trade[`period`] === period)
      .map((trade) => trade[field]).reduce(reducer);
  }
  return periodProfits;
};

const getAssetProps = (symbolTradesInCategory) => {
  const {buyAmount, sellAmount} = getAssetInfo(symbolTradesInCategory);
  const periodNames = [...(new Set(symbolTradesInCategory.map((trade) => trade[`period`])))];
  const periodProfits = sumAssetDataByPeriods(symbolTradesInCategory, periodNames, `realizedPnl`);
  const periodFees = sumAssetDataByPeriods(symbolTradesInCategory, periodNames, `fee`);

  return {
    buyAmount,
    sellAmount,
    profit: getSumByField(symbolTradesInCategory, `realizedPnl`),
    fee: getSumByField(symbolTradesInCategory, `fee`),
    invest: getSumByField(symbolTradesInCategory, `invest`),
    isClosed: getIsClosed(buyAmount, sellAmount),
    periodNames,
    periodProfits,
    periodFees,
  };
};

module.exports = {reducer, getCountable, sumAssetsDataByPeriods, getAssetInfo, getSumByField, getIsClosed, sortBySellPeriod, getAssetProps};
