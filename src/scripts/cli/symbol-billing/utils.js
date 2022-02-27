'use strict';

const {CATEGORY_NULL} = require(`./constants`);
const {getSymbolInfoInPeriod} = require(`../../../bill/spot/utils`);
const {Type} = require(`../../../bill/constants`);

const getSymbolTradesInCategory = (allTrades, symbol, category) => category === CATEGORY_NULL
  ? allTrades
    .filter((trade) => trade[`symbol`].includes(symbol))
  : allTrades
    .filter((trade) => trade[`symbol`].includes(symbol))
    .filter((trade) => trade[`category`] === category);

const getSymbolBilling = (allTrades, symbol, category) => {
  const periods = [...new Set(allTrades.map((trade) => trade[`period`]))];
  const symbolTrades = getSymbolTradesInCategory(allTrades, symbol, category);

  const price = {buy: 0, sell: 0};
  const amountSummary = {buy: 0, sell: 0};
  const totalSummary = {buy: 0, sell: 0};
  let profit = 0;

  const result = {buy: [], sell: []};
  for (const period of periods) {
    const {
      amountBuyInPeriod,
      amountSellInPeriod,
      totalBuyInPeriod,
      totalSellInPeriod,
      // sellFeeInPeriod,
      // buyFeeInPeriod,
    } = getSymbolInfoInPeriod(symbolTrades, period);

    amountSummary.buy = amountSummary.buy + amountBuyInPeriod;
    amountSummary.sell = amountSummary.sell + amountSellInPeriod;

    totalSummary.buy = totalSummary.buy + totalBuyInPeriod;
    totalSummary.sell = totalSummary.sell + totalSellInPeriod;

    price.buy = totalSummary.buy / amountSummary.buy || price.buy;
    price.sell = totalSellInPeriod / amountSellInPeriod || price.sell;

    const realizedPnl = totalSellInPeriod - price.buy * amountSellInPeriod;
    profit = profit + realizedPnl;

    result[`buy`].push({
      period,
      type: Type.BUY,
      symbol,
      price: totalBuyInPeriod / amountBuyInPeriod || 0,
      amount: amountBuyInPeriod,
      total: totalBuyInPeriod,
    });

    result[`sell`].push({
      period,
      type: Type.SELL,
      symbol,
      price: totalSellInPeriod / amountSellInPeriod || 0,
      amount: amountSellInPeriod,
      total: totalSellInPeriod,
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
