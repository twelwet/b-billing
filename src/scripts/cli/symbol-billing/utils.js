'use strict';

const {CATEGORY_NULL} = require(`./constants`);
const {reducer} = require(`../../../bill/bill-utils`);
const {Type} = require(`../../../bill/constants`);

const getSymbolTradesInCategory = (allTrades, symbol, category) => category === CATEGORY_NULL
  ? allTrades
    .filter((trade) => trade[`symbol`].includes(symbol))
  : allTrades
    .filter((trade) => trade[`symbol`].includes(symbol))
    .filter((trade) => trade[`category`] === category);

const getSum = (trades, field) => trades.length > 0 ? trades.map((trade) => trade[field]).reduce(reducer) : 0;

const getSymbolBilling = (allTrades, symbol, category) => {
  const periods = [...new Set(allTrades.map((trade) => trade[`period`]))];
  const symbolTrades = getSymbolTradesInCategory(allTrades, symbol, category);

  const price = {buy: 0, sell: 0};
  const amountSummary = {buy: 0, sell: 0};
  const totalSummary = {buy: 0, sell: 0};
  let profit = 0;

  const result = {buy: [], sell: []};
  for (const period of periods) {
    const periodTrades = symbolTrades.filter((trade) => trade[`period`] === period);
    const periodTradesBuy = periodTrades
      .filter((trade) => trade[`type`] === Type.BUY)
      .filter((trade) => trade[`tradeType`] === `closed`);
    const periodTradesSell = periodTrades
      .filter((trade) => trade[`type`] === Type.SELL)
      .filter((trade) => trade[`tradeType`] === `closed`);

    const amountBuy = getSum(periodTradesBuy, `amount`);
    const amountSell = getSum(periodTradesSell, `amount`);

    amountSummary.buy = amountSummary.buy + amountBuy;
    amountSummary.sell = amountSummary.sell + amountSell;

    const totalBuy = getSum(periodTradesBuy, `total`);
    const totalSell = getSum(periodTradesSell, `total`);

    totalSummary.buy = totalSummary.buy + totalBuy;
    totalSummary.sell = totalSummary.sell + totalSell;

    price.buy = totalSummary.buy / amountSummary.buy || price.buy;
    price.sell = totalSell / amountSell || price.sell;

    const realizedPnl = totalSell - price.buy * amountSell;
    profit = profit + realizedPnl;

    result[`buy`].push({
      period,
      type: Type.BUY,
      symbol,
      price: totalBuy / amountBuy || 0,
      amount: amountBuy,
      total: totalBuy,
    });

    result[`sell`].push({
      period,
      type: Type.SELL,
      symbol,
      price: totalSell / amountSell || 0,
      amount: amountSell,
      total: totalSell,
      realizedPnl,
    });

  }
  result[`buy`].push({
    period: `SUMMARY`,
    type: Type.BUY,
    symbol,
    price: totalSummary.buy / amountSummary.buy,
    amount: amountSummary.buy,
    total: totalSummary.buy,
  });

  result[`sell`].push({
    period: `SUMMARY`,
    type: Type.SELL,
    symbol,
    price: totalSummary.sell / amountSummary.sell,
    amount: amountSummary.sell,
    total: totalSummary.sell,
    realizedPnl: profit,
  });

  return result;
};

module.exports = {getSymbolBilling};
