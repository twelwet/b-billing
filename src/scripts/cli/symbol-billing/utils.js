'use strict';

const {CATEGORY_NULL} = require(`./constants`);
const {reducer} = require(`../../../bill/bill-utils`);

const getSymbolTradesInCategory = (allTrades, symbol, category) => category === CATEGORY_NULL
  ? allTrades
    .filter((trade) => trade[`symbol`].includes(symbol))
  : allTrades
    .filter((trade) => trade[`symbol`].includes(symbol))
    .filter((trade) => trade[`category`] === category);

const getSum = (trades, field) => trades.length > 0 ? trades.map((trade) => trade[field]).reduce(reducer) : 0;

const getSymbolBilling = (allTrades, symbol, category) => {
  const periods = [...new Set(allTrades.map((trade) => trade[`period`]))];
  const symbolTradesInCategory = getSymbolTradesInCategory(allTrades, symbol, category);

  const price = {
    buy: 0,
    sell: 0,
  };
  const amount = {
    buy: 0,
    sell: 0,
  };

  const result = [];
  for (const period of periods) {
    const periodTrades = symbolTradesInCategory.filter((trade) => trade[`period`] === period);
    const periodTradesBuy = periodTrades.filter((trade) => trade[`type`] === `BUY`);
    const periodTradesSell = periodTrades.filter((trade) => trade[`type`] === `SELL`);

    const amountBuy = getSum(periodTradesBuy, `amount`);
    const amountSell = getSum(periodTradesSell, `amount`);

    amount.buy = amount.buy + amountBuy;
    amount.sell = amount.sell + amountSell;

    const totalBuy = getSum(periodTradesBuy, `total`);
    const totalSell = getSum(periodTradesSell, `total`);

    price.buy = totalBuy / amountBuy || price.buy;
    price.sell = totalSell / amountSell || price.sell;

    // const realizedPnl = totalSell - price.buy * amountSell;

    result.push({
      period,
      symbol,
      amountBuy,
      amountSell,
      amountBalance: amountBuy - amountSell,
    });

  }
  result.push({
    period: `SUMMARY`,
    symbol,
    amountBuy: amount.buy,
    amountSell: amount.sell,
    amountBalance: amount.buy - amount.sell,
  });
  return result;
};


module.exports = {getSymbolBilling};
