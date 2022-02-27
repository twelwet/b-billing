'use strict';

const {reducer, getAssetInfo, getIsClosed, getSumByField} = require(`../bill-utils`);

const getTargetTrades = (allTrades, categoryName, tradeType, baseCoin) =>
  allTrades
    .filter((trade) => trade[`category`] === categoryName)
    .filter((trade) => trade[`baseCoin`] === baseCoin)
    .filter((trade) => trade[`tradeType`] === tradeType);

const getSymbolInfoInPeriod = (symbolTrades, periodName) => {
  const periodTrades = symbolTrades.filter((trade) => trade[`period`] === periodName);
  const periodTradesBuy = periodTrades.length > 0
    ? periodTrades.filter((trade) => trade[`type`] === `BUY`)
    : [{amount: 0, total: 0}];
  const periodTradesSell = periodTrades.length > 0
    ? periodTrades.filter((trade) => trade[`type`] === `SELL`)
    : [{amount: 0, total: 0}];

  return {
    amountBuyInPeriod: getSumByField(periodTradesBuy, `amount`),
    amountSellInPeriod: getSumByField(periodTradesSell, `amount`),
    totalBuyInPeriod: getSumByField(periodTradesBuy, `total`),
    totalSellInPeriod: getSumByField(periodTradesSell, `total`),
    sellFeeInPeriod: getSumByField(periodTradesSell, `fee`) || 0,
    buyFeeInPeriod: getSumByField(periodTradesBuy, `fee`) || 0,
  };
};

const getSymbolBilling = (trades, symbol, periodNames) => {
  const assetTrades = trades.filter((item) => item[`symbol`] === symbol);
  const {buyAmount, sellAmount, buyTotal, sellTotal} = getAssetInfo(assetTrades);
  const isClosed = getIsClosed(buyAmount, sellAmount);

  const price = {buy: 0, sell: 0};
  const amountSummary = {buy: 0, sell: 0};
  const totalSummary = {buy: 0, sell: 0};
  const periodProfits = {};
  const periodFee = {};

  for (const period of periodNames) {
    const {
      amountBuyInPeriod,
      amountSellInPeriod,
      totalBuyInPeriod,
      totalSellInPeriod,
      sellFeeInPeriod,
      buyFeeInPeriod,
    } = getSymbolInfoInPeriod(assetTrades, period);

    amountSummary.buy = amountSummary.buy + amountBuyInPeriod;
    amountSummary.sell = amountSummary.sell + amountSellInPeriod;

    totalSummary.buy = totalSummary.buy + totalBuyInPeriod;
    totalSummary.sell = totalSummary.sell + totalSellInPeriod;

    price.buy = totalSummary.buy / amountSummary.buy || price.buy;
    price.sell = totalSellInPeriod / amountSellInPeriod || price.sell;

    periodProfits[`${period}`] = totalSellInPeriod - price.buy * amountSellInPeriod;
    periodFee[`${period}`] = sellFeeInPeriod + buyFeeInPeriod;
  }

  const profit = Object.values(periodProfits).reduce(reducer);
  const fee = Object.values(periodFee).reduce(reducer);

  return {
    buyAmount,
    sellAmount,
    buyTotal,
    sellTotal,
    isClosed,
    profit,
    periodProfits,
    periodFee,
    fee,
  };
};

module.exports = {getTargetTrades, getSymbolBilling, getSymbolInfoInPeriod};
